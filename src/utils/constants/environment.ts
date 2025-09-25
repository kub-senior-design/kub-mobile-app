import { z } from "zod";

const environmentValidator = z.enum(["dev", "test", "stage", "prod"]);

const environmentValue = process.env.EXPO_PUBLIC_ENVIRONMENT;

const { success, data } = environmentValidator.safeParse(environmentValue);

if (!success) {
  throw new Error(`Invalid environment variable: ${environmentValue}`);
}

export const ENVIRONMENT = data;
