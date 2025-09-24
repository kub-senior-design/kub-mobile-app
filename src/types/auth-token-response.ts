import { z } from "zod";

export const authTokenResponseSchema = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
    id_token: z.string(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    idToken: data.id_token,
  }));

export type AuthTokenResponse = z.infer<typeof authTokenResponseSchema>;
