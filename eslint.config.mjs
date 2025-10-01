// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

// Ignore generated/build output
const ignores = [
  "**/node_modules/**",
  ".next/**",
  ".contentlayer/**",
  "public/**",
  "dist/**",
  "build/**",
  ".vercel/**",
  "coverage/**",
  "tailwind.config.ts",
];

// Limit linting to your source dirs (adjust as needed)
const files = [
  "app/**/*.{ts,tsx,js,jsx}",
  "components/**/*.{ts,tsx,js,jsx}",
  "lib/**/*.{ts,tsx,js,jsx}",
  "pages/**/*.{ts,tsx,js,jsx}",
  "scripts/**/*.{ts,tsx,js,jsx}",
];

// Bridge Next's legacy "extends" into flat config
const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  // A) Global ignores
  { ignores },

  // B) Next.js rules (core-web-vitals)
  ...compat.config({
    extends: ["next/core-web-vitals"],
    // If your Next app isn't at repo root, set:
    // settings: { next: { rootDir: "apps/web" } },
  }),

  // C) Base JS recommended rules
  js.configs.recommended,

  // D) TypeScript recommended (type-aware) + stylistic rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // E) Project-scoped settings for TS/React files
  {
    files,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],   // make sure this exists
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Next fast-refresh (okay to keep off for App Router)
      "react-refresh/only-export-components": "off",

      // Temporary relaxations (tighten later if you want)
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
