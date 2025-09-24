import { DiscoveryDocument, makeRedirectUri } from "expo-auth-session";

import { ENVIRONMENT } from "./environment";

const CUSTOMER_AUTH_CLIENT_IDS = {
  dev: "1cb55ef1-5246-4e6b-bce4-791690cababc",
  test: "16b1b311-463e-4dba-beca-ec561d713f16",
  stage: "0cfddcac-014a-41f6-9eaf-2fcea94aa1a9",
  prod: "806e58e2-5935-4d1e-abce-2d85ea0dd776",
} as const;

const CUSTOMER_AUTH_BASE_URLS = {
  dev: "kubb2cdev.b2clogin.com",
  test: "logintst.kub.org",
  stage: "kubb2cstg.b2clogin.com",
  prod: "login.kub.org",
} as const;

const CUSTOMER_AUTH_TENANT_IDS = {
  dev: "kubb2cdev.onmicrosoft.com",
  test: "logintst.kub.org",
  stage: "kubb2cstg.onmicrosoft.com",
  prod: "login.kub.org",
} as const;

export const CUSTOMER_AUTH_CLIENT_ID = CUSTOMER_AUTH_CLIENT_IDS[ENVIRONMENT];
export const CUSTOMER_AUTH_BASE_URL = CUSTOMER_AUTH_BASE_URLS[ENVIRONMENT];
export const CUSTOMER_AUTH_TENANT_ID = CUSTOMER_AUTH_TENANT_IDS[ENVIRONMENT];

export const CUSTOMER_AUTH_DISCOVERY_DOCUMENT: DiscoveryDocument = {
  authorizationEndpoint: `https://${CUSTOMER_AUTH_BASE_URL}/${CUSTOMER_AUTH_TENANT_ID}/B2C_1_sign_in/oauth2/v2.0/authorize`,
};

export const CUSTOMER_AUTH_SCOPES = ["openid", "profile", "email"];

export const CUSTOMER_AUTH_REDIRECT_URI = makeRedirectUri({
  scheme: "msauth.org.kub.customerapp",
  path: "auth",
});
