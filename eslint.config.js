import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "coverage", "playwright-report", "node_modules"]),

  {
    files: ["**/vite.config.*", "**/*.config.*", "**/eslint.config.js"],
    languageOptions: {
      parserOptions: { project: null },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.eslint.json",
        },
      },
    },

    plugins: {
      import: importPlugin,
      prettier,
    },

    rules: {
      "react/react-in-jsx-scope": "off",

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["src/*"],
              message: "Use layer aliases (@shared, @entities, etc.) instead of src/ paths.",
            },

            {
              group: ["@shared/*/*", "@shared/*/*/*", "@shared/*/*/*/*"],
              message: "Import only from @shared/* (barrel). Example: @shared/api",
            },
            {
              group: ["@entities/*/*", "@entities/*/*/*", "@entities/*/*/*/*"],
              message: "Import only from @entities/* (barrel). Example: @entities/product",
            },
            {
              group: ["@features/*/*", "@features/*/*/*", "@features/*/*/*/*"],
              message: "Import only from @features/* (barrel). Example: @features/product-search",
            },
            {
              group: ["@pages/*/*", "@pages/*/*/*", "@pages/*/*/*/*"],
              message: "Import only from @pages/* (barrel). Example: @pages/products",
            },
            {
              group: ["@app/*/*", "@app/*/*/*", "@app/*/*/*/*"],
              message: "Import only from @app/* (barrel). Example: @app/App",
            },
          ],
        },
      ],

      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"], ["type"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "import/no-cycle": ["error", { maxDepth: 2 }],

      "prettier/prettier": "error",

      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
    },
  },

  /**
   * Architecture rules (Clean Architecture / layers)
   * Allowed direction: app → pages → features → entities → shared
   */
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@entities/*", "@features/*", "@pages/*", "@app/*"],
        },
      ],
    },
  },

  {
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@features/*", "@pages/*", "@app/*"],
        },
      ],
    },
  },

  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@pages/*", "@app/*"],
        },
      ],
    },
  },

  {
    files: ["src/pages/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@app/*"],
        },
      ],
    },
  },
]);
