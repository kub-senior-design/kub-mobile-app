// @ts-check

import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { defineConfig } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
// @ts-expect-error eslint-plugin-react-native is not typed
import eslintPluginReactNative from "eslint-plugin-react-native";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default defineConfig(
  // recommended plugin rules
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  ...pluginQuery.configs["flat/recommended"],
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
      "react-native": fixupPluginRules(eslintPluginReactNative),
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

      // react rules
      "react/react-in-jsx-scope": "off",

      // react native rules
      "react-native/no-color-literals": "error",
      "react-native/no-inline-styles": "off",
      "react-native/no-raw-text": "error",
      "react-native/no-single-element-style-arrays": "error",
      "react-native/no-unused-styles": "error",
      "react-native/sort-styles": "error",
      "react-native/split-platform-components": "error",
    },
  },
);
