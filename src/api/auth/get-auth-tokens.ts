import {
  AuthTokenResponse,
  authTokenResponseSchema,
} from "@/types/auth-token-response";
import { failure, Result, success } from "@/types/result";
import { API_BASE_URL } from "@/utils/constants/api";
import {
  CUSTOMER_AUTH_CLIENT_ID,
  CUSTOMER_AUTH_REDIRECT_URI,
} from "@/utils/constants/auth";

const AUTH_TOKEN_API_URL = `${API_BASE_URL}/auth/v1/oauth2/v2.0/token/customer`;

export async function getAuthTokens(
  code: string,
  codeVerifier: string,
): Promise<Result<AuthTokenResponse>> {
  try {
    const formData = new FormData();

    formData.append("code", code);
    formData.append("client_id", CUSTOMER_AUTH_CLIENT_ID);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", CUSTOMER_AUTH_REDIRECT_URI);
    formData.append("code_verifier", codeVerifier);

    const response = await fetch(AUTH_TOKEN_API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    const tokens = authTokenResponseSchema.parse(data);

    return success(tokens);
  } catch (error) {
    return failure(error);
  }
}

export async function refreshAuthTokens(
  refreshToken: string,
): Promise<Result<AuthTokenResponse>> {
  try {
    const formData = new FormData();

    formData.append("client_id", CUSTOMER_AUTH_CLIENT_ID);
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", refreshToken);

    const response = await fetch(AUTH_TOKEN_API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    const tokens = authTokenResponseSchema.parse(data);

    return success(tokens);
  } catch (error) {
    return failure(error);
  }
}
