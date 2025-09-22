import { assert } from "@ember/debug";
import { getOwner } from "@ember/owner";
import Service, { service } from "@ember/service";
import {
  getConfig,
  getOwnConfig,
  isDevelopingApp,
  isTesting as isTestingMacro,
  macroCondition,
} from "@embroider/macros";
import { tracked } from "@glimmer/tracking";
import { restartableTask, timeout } from "ember-concurrency";

import { randomString } from "../utils/crypto.ts";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce.ts";

import type { StateData, UrlAuthParams, UserType } from "..";
import type SessionService from "./session.ts";
import type KubSessionStore from "../session-stores/application";
import type Router from "@ember/routing/router";
import type { IntlService } from "ember-intl";

const isTesting = macroCondition(isTestingMacro()) ? true : false;
const isDeveloping = macroCondition(isDevelopingApp()) ? true : false;
const isUsingMirage = getConfig("@kub/common")?.isUsingMirage;

const AAD_TENANT_ID = "b23dd361-6f32-4048-8f90-81a7370fe20a";
const AAD_CLIENT_ID = "09ab1330-e3db-4b86-a690-cd56ed895394";

const AGENCIES_CLIENT_IDS = {
  dev: "3f5f9595-9c6f-48d9-acec-14fe0a58d21a",
  test: "34db81de-f632-4690-bcb9-24ba56f0ef3e",
  stage: "078f00a6-f5d4-47ab-9ff3-6234705fa436",
  prod: "92213660-a408-4e83-bc5c-dfe70ce8fe00",
};

const AGENCIES_BASEURLS = {
  dev: "kubb2cagenciesdev.b2clogin.com",
  test: "kubb2cagenciestst.b2clogin.com",
  stage: "kubb2cagenciesstg.b2clogin.com",
  prod: "kubb2cagenciesprd.b2clogin.com",
};

const AGENCIES_TENANT_IDS = {
  dev: "kubb2cagenciesdev.onmicrosoft.com",
  test: "kubb2cagenciestst.onmicrosoft.com",
  stage: "kubb2cagenciesstg.onmicrosoft.com",
  prod: "kubb2cagenciesprd.onmicrosoft.com",
};

const CUSTOMER_CLIENT_IDS = {
  dev: "1cb55ef1-5246-4e6b-bce4-791690cababc",
  test: "16b1b311-463e-4dba-beca-ec561d713f16",
  stage: "0cfddcac-014a-41f6-9eaf-2fcea94aa1a9",
  prod: "806e58e2-5935-4d1e-abce-2d85ea0dd776",
};

const CUSTOMER_BASEURLS = {
  dev: "kubb2cdev.b2clogin.com",
  test: "logintst.kub.org",
  stage: "kubb2cstg.b2clogin.com",
  prod: "login.kub.org",
};

const CUSTOMER_TENANT_IDS = {
  dev: "kubb2cdev.onmicrosoft.com",
  test: "logintst.kub.org",
  stage: "kubb2cstg.onmicrosoft.com",
  prod: "login.kub.org",
};

const THREE_MINUTES = 180000;

export default class AuthenticationService extends Service {
  @service
  declare intl: IntlService;

  @service
  declare session: SessionService;

  @service
  declare router: Router;

  @tracked
  receivedShortRefresh = false;

  get userType() {
    const userType = this.session.userType ?? getOwnConfig()?.defaultUserType;

    assert("User type must be set", userType);

    return userType;
  }

  get forgotPasswordPath() {
    return getOwnConfig()?.forgotPasswordPath;
  }

  async getB2cForgotRoute() {
    if (this.forgotPasswordPath) {
      return this.forgotPasswordPath;
    }
    const userType = this.userType;
    if (!userType) {
      return "/";
    }
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const nonce = this.storeStateObject(userType, codeVerifier, true);
    return this.getLoginUrl(codeChallenge, nonce, userType, "pwd_reset");
  }

  get environmentConfig(): EnvironmentConfig {
    // @ts-expect-error - `resolveRegistration` no longer exists on the return value of `getOwner`
    return getOwner(this).resolveRegistration("config:environment");
  }

  get environmentOverride() {
    return getOwnConfig()?.environment;
  }

  get localEnvironment() {
    const { environmentOverride, kubEnvironment } = this;

    if (isDeveloping || isTesting) {
      return environmentOverride ?? kubEnvironment;
    }

    return kubEnvironment;
  }

  get kubEnvironment() {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0] as string;

    if (subdomain.includes("dev")) {
      return "dev";
    }

    if (subdomain.includes("tst")) {
      return "test";
    }

    if (subdomain.includes("stg")) {
      return "stage";
    }

    if (subdomain == "apps" || subdomain == "agencies" || subdomain == "www") {
      return "prod";
    }

    return "dev";
  }

  getClientId(userType: UserType) {
    const { localEnvironment } = this;

    if (userType === "agency") {
      return AGENCIES_CLIENT_IDS[localEnvironment] ?? "";
    }

    if (userType === "customer") {
      return CUSTOMER_CLIENT_IDS[localEnvironment] ?? "";
    }

    return AAD_CLIENT_ID;
  }

  get rootURL() {
    let { rootURL } = this.router;

    if (!rootURL.endsWith("/")) {
      rootURL += "/";
    }

    return rootURL;
  }

  get redirectUri() {
    let redirectUri = `${window.location.origin}/auth-callback`;

    if (window.ELECTRON) {
      redirectUri = window.electronBridge!.authRedirectUri;
    }

    return redirectUri;
  }

  get postLogoutUri() {
    return `${window.location.origin}${this.rootURL}logout`;
  }

  async transitionToMicrosoftLogin(userTypeArg?: UserType) {
    const userType = userTypeArg ?? this.userType;

    if (isTesting || isUsingMirage) {
      this.router.transitionTo("auth-callback");
      return;
    }
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const nonce = this.storeStateObject(userType, codeVerifier, false);
    const url = this.getLoginUrl(codeChallenge, nonce, userType, "sign_in");

    window.location.replace(url);
  }

  storeStateObject(
    userType: UserType,
    codeVerifier: string,
    passwordReset: boolean,
  ) {
    const stateObject = this.createStateObject(
      userType,
      codeVerifier,
      passwordReset,
    );
    const nonce = randomString(20);

    window.localStorage.setItem(nonce, JSON.stringify(stateObject));

    return nonce;
  }

  getStateObject(nonce?: string) {
    if (!nonce) {
      return;
    }

    const stateString = window.localStorage.getItem(nonce);
    window.localStorage.removeItem(nonce);

    if (stateString) {
      return JSON.parse(stateString) as StateData;
    }
  }

  createStateObject(
    userType: UserType,
    codeVerifier: string,
    passwordReset: boolean,
  ): StateData {
    const attemptedTransitionTarget = this.session.attemptedTransition?.to;
    let routeName = undefined;
    const paramArray: unknown[] = [];
    const queryParams: Record<string, unknown> = {};
    let transitionRoute = attemptedTransitionTarget ?? null;
    if (attemptedTransitionTarget) {
      routeName = attemptedTransitionTarget.name;
      while (transitionRoute) {
        const paramNames = transitionRoute.paramNames;
        const params = transitionRoute.params!;
        const mappedParams = paramNames.map((param) => params[param]);

        if (mappedParams.length > 0) {
          paramArray.unshift(...mappedParams);
        }

        Object.assign(queryParams, transitionRoute.queryParams);
        transitionRoute = transitionRoute.parent;
      }
    }
    const appUrl = window.location.origin;
    const rootURL = this.rootURL ?? "/";
    return {
      userType,
      routeName,
      params: paramArray,
      queryParams,
      url: `${appUrl}${rootURL}`,
      codeVerifier,
      passwordReset,
    };
  }

  async parseResponse(urlParams: string) {
    const params = {} as UrlAuthParams;
    const query = urlParams.substring(urlParams.indexOf("?"));
    const regex = /([^#?&=]+)=([^&]*)/g;
    let match;

    // decode all parameter pairs
    const validParameters = ["code", "state", "error", "error_description"];
    while ((match = regex.exec(query)) !== null) {
      const key = match[1];
      const value = match[2];
      if (!key || !value) {
        continue;
      }
      const decodedKey = decodeURIComponent(key);
      if (!validParameters.includes(decodedKey)) {
        continue;
      }
      params[decodedKey] = decodeURIComponent(value);
    }

    if (params.error_description) {
      const forgotPasswordErrorCode = "AADB2C90118";
      const passwordResetCancelErrorCode = "AADB2C90091";
      if (params.error_description.includes(forgotPasswordErrorCode)) {
        window.location.replace(await this.getB2cForgotRoute());
      }

      if (params.error_description.includes(passwordResetCancelErrorCode)) {
        await this.transitionToMicrosoftLogin();
      }

      params.error_description = params.error_description.replace(/\+/gm, " ");
      params.error_description = params.error_description.replace(
        /[\n\r]/gm,
        "",
      );
      params.error_description = params.error_description.replace(
        /^AAD[a-zA-Z0-9]+: /,
        "",
      );
      params.error_description = params.error_description.replace(
        /Trace ID:.*$/,
        "",
      );
    }
    const stateObject = this.getStateObject(params.state);
    if (!stateObject) {
      params.code = undefined;
      params.error = true;
      params.error_description = this.intl.t("kub.auth.login.error.nonce");
    }
    params.stateData = stateObject;
    if (isTesting || isUsingMirage) {
      params.stateData = {
        userType: getOwnConfig()?.defaultUserType,
      } as StateData;
    }
    return params;
  }

  getSharedQueryParams(
    codeChallenge: string,
    nonce: string,
    userType: UserType,
  ) {
    return (
      `&redirect_uri=${this.redirectUri}` +
      `&response_type=code` +
      `&state=${nonce}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256` +
      `&client_id=${this.getClientId(userType)}`
    );
  }

  getLoginUrl(
    codeChallenge: string,
    nonce: string,
    userType: UserType,
    flow: string,
  ) {
    const clientId = this.getClientId(userType);
    const environment = this.localEnvironment;
    const sharedQueryParams = this.getSharedQueryParams(
      codeChallenge,
      nonce,
      userType,
    );

    if (userType === "agency") {
      return (
        `https://${AGENCIES_BASEURLS[environment]}/${AGENCIES_TENANT_IDS[environment]}/` +
        `B2C_1_${flow}/oauth2/v2.0/authorize` +
        `?scope=openid%20profile%20${clientId}` +
        sharedQueryParams
      );
    } else if (userType === "customer") {
      return (
        `https://${CUSTOMER_BASEURLS[environment]}/${CUSTOMER_TENANT_IDS[environment]}/` +
        `B2C_1_${flow}/oauth2/v2.0/authorize` +
        `?scope=openid%20profile%20${clientId}` +
        sharedQueryParams
      );
    } else if (userType === "employee") {
      return (
        `https://login.microsoftonline.com/${AAD_TENANT_ID}/oauth2/v2.0/authorize` +
        `?response_mode=query` +
        `&scope=openid profile offline_access` +
        `&domain_hint=kub.org` +
        sharedQueryParams
      );
    }

    throw new Error("Invalid user type");
  }

  loginWithAuthCode(authCode: string, stateData: StateData) {
    const userType = stateData.userType;
    const formData = new FormData();

    formData.append("code", authCode);
    formData.append("client_id", this.getClientId(userType));
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", this.redirectUri);
    formData.append("code_verifier", stateData.codeVerifier);

    return this.tokenApiPost(userType, formData);
  }

  async refreshSession() {
    const userType = this.session.userType;
    if (!userType) {
      throw new Error("No ID token found");
    }
    const formData = new FormData();

    formData.append("client_id", this.getClientId(userType));
    formData.append("grant_type", "refresh_token");

    return await this.tokenApiPost(userType, formData);
  }

  async tokenApiPost(userType: UserType, formData: FormData): Promise<object> {
    const validUserTypes = ["agency", "customer", "employee"];
    if (!validUserTypes.includes(userType)) {
      throw new Error("Invalid user type");
    }
    let url = `/api/auth/v1/oauth2/v2.0/token/${userType}`;
    if (window.ELECTRON) {
      url = `${window.electronBridge!.apiOrigin}${url}`;
    }

    const sessionStore = this.session.store as KubSessionStore;

    try {
      sessionStore.isAuthenticating = true;
      const response = await fetch(url, {
        body: formData,
        method: "POST",
      });
      if (response.ok) {
        return await response.json().catch(() => null);
      } else {
        throw await response.json().catch(() => {});
      }
    } finally {
      sessionStore.isAuthenticating = false;
    }
  }

  logout() {
    const userType = this.session.userType;

    if (!userType) {
      window.location.replace(window.location.origin);
      return;
    }

    const url = `${window.location.origin}/api/auth/v1/oauth2/v2.0/logout/${userType}?post_logout_redirect_uri=${this.postLogoutUri}`;

    window.location.replace(url);
  }

  scheduleTokenRefresh() {
    let tokenExpires = this.session.getTokenExpirationMillis();
    if (!tokenExpires) {
      tokenExpires = 0;
    }

    const now = new Date().getTime();
    const waitTimeExpires = tokenExpires - now;
    const waitTimeRefresh = waitTimeExpires - THREE_MINUTES;
    if (waitTimeRefresh <= 0) {
      if (waitTimeExpires <= 0) {
        this.expireAccessToken.perform(0);
      } else if (this.receivedShortRefresh) {
        this.expireAccessToken.perform(waitTimeExpires);
      } else {
        this.receivedShortRefresh = true;
        this.refreshAccessToken.perform(0);
      }
    } else {
      this.receivedShortRefresh = false;
      this.refreshAccessToken.perform(waitTimeRefresh);
    }
  }

  refreshAccessToken = restartableTask(async (waitTime: number) => {
    if (isTesting) {
      return;
    }

    await timeout(waitTime);

    try {
      const response = await this.refreshSession();
      this.session.authenticate("authenticator:application", response);
      await this.session.trigger("refresh");
    } catch {
      this.session.invalidate();
    }
  });

  expireAccessToken = restartableTask(async (waitTime: number) => {
    if (isTesting) {
      return;
    }

    await timeout(waitTime);

    this.session.invalidate();
  });
}

declare module "@ember/service" {
  interface Registry {
    authentication: AuthenticationService;
  }
}
