import { ENVIRONMENT } from "./environment";

const API_BASE_URLS = {
  dev: "https://dev.kub.org/api",
  test: "https://tst.kub.org/api",
  stage: "https://stg.kub.org/api",
  prod: "https://kub.org/api",
} as const;

export const API_BASE_URL = API_BASE_URLS[ENVIRONMENT];
