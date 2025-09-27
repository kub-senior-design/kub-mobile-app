// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default defineConfig(
  // recommended plugin rules
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginPrettierRecommended,

  // enable typed linting
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: eslintPluginImport,
    },
    rules: {
      // Formatting and style rules
      "prettier/prettier": "error",
      "no-console": ["error", { allow: ["error"] }],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",

      // Import rules
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // typescript rules
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
