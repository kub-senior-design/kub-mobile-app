/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_ENVIRONMENT: "dev" | "test" | "stage" | "prod";
  }
}
