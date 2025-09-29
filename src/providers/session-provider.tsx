import axios, { AxiosInstance } from "axios";
import { useAuthRequest } from "expo-auth-session";
import { openBrowserAsync } from "expo-web-browser";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import { getAuthTokens, refreshAuthTokens } from "@/api/auth/get-auth-tokens";
import { User } from "@/types/user";
import decodeIdToken from "@/utils/auth/decode-id-token";
import { API_BASE_URL } from "@/utils/constants/api";
import {
  CUSTOMER_AUTH_CLIENT_ID,
  CUSTOMER_AUTH_DISCOVERY_DOCUMENT,
  CUSTOMER_AUTH_REDIRECT_URI,
  CUSTOMER_AUTH_SCOPES,
} from "@/utils/constants/auth";

export type SessionContextType = {
  isAuthenticating: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  apiClient: AxiosInstance;
  user: User | null;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

type SessionProviderProps = {
  children: ReactNode;
};

export default function SessionProvider({
  children,
}: SessionProviderProps): ReactNode {
  // state
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // tokens
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  // request to get auth code from B2C
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CUSTOMER_AUTH_CLIENT_ID,
      scopes: CUSTOMER_AUTH_SCOPES,
      redirectUri: CUSTOMER_AUTH_REDIRECT_URI,
    },
    CUSTOMER_AUTH_DISCOVERY_DOCUMENT,
  );

  // fetch auth tokens from auth-rs
  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      if (response?.type !== "success") {
        return;
      }

      setIsAuthenticating(true);

      const { code } = response.params;

      const codeVerifier = request?.codeVerifier;

      if (!codeVerifier) {
        console.error("No code verifier found when signing in.");
        Alert.alert("An error occurred signing in. Please try again later.");
        setIsAuthenticating(false);
        return;
      }

      const [authTokens, authTokensError] = await getAuthTokens(
        code,
        codeVerifier,
      );

      if (authTokensError !== null) {
        Alert.alert("An error occurred signing in. Please try again later.");
        setIsAuthenticating(false);
        return;
      }

      setAccessToken(authTokens.accessToken);
      setRefreshToken(authTokens.refreshToken);
      setIdToken(authTokens.idToken);

      setIsAuthenticating(false);
    };

    void fetchToken();
  }, [response]);

  // create api client with access token
  const apiClient = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE_URL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [accessToken],
  );

  // refresh access token if a 401 response is received
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401) {
        throw error;
      }

      if (!refreshToken) {
        throw error;
      }

      if (originalRequest._hasRetried) {
        throw error;
      }

      originalRequest._hasRetried = true;

      const [newAuthTokens, newAuthTokensError] =
        await refreshAuthTokens(refreshToken);

      if (newAuthTokensError !== null) {
        await logout();
        throw error;
      }

      setAccessToken(newAuthTokens.accessToken);
      setRefreshToken(newAuthTokens.refreshToken);
      setIdToken(newAuthTokens.idToken);

      originalRequest.headers.Authorization = `Bearer ${newAuthTokens.accessToken}`;
      return apiClient(originalRequest);
    },
  );

  const login = async (): Promise<void> => {
    await promptAsync();
  };

  const logout = async (): Promise<void> => {
    await openBrowserAsync(
      `${API_BASE_URL}/auth/v1/oauth2/v2.0/logout/customer?post_logout_redirect_uri=${CUSTOMER_AUTH_REDIRECT_URI}`,
    );

    setAccessToken(null);
    setRefreshToken(null);
    setIdToken(null);
  };

  const [user, userError] = decodeIdToken(idToken);

  if (userError !== null) {
    console.error("Error decoding ID token", userError);
    Alert.alert("An error occurred signing in. Please try again later.");
  }

  return (
    <SessionContext.Provider
      value={{ isAuthenticating, login, logout, apiClient, user }}
    >
      {children}
    </SessionContext.Provider>
  );
}
