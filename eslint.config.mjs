// eslint.config.mjs
import { defineConfig } from "eslint";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

// ① Ignore generated/build output
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

// ② Limit linting to your source dirs (add/remove as you need)
const files = [
  "app/**/*.{ts,tsx,js,jsx}",
  "components/**/*.{ts,tsx,js,jsx}",
  "lib/**/*.{ts,tsx,js,jsx}",
  "pages/**/*.{ts,tsx,js,jsx}",
  "scripts/**/*.{ts,tsx,js,jsx}",
];

// Bridge for legacy "extends" (Next rules) into flat config
const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default defineConfig([
  // A) Ignore patterns
  { ignores },

  // B) Next.js rules (core-web-vitals)
  ...compat.config({
    extends: ["next/core-web-vitals"],
    // If your Next app isn't at repo root, uncomment:
    // settings: { next: { rootDir: "apps/web" } },
  }),

  // C) Base JS recommended rules
  js.configs.recommended,

  // D) TypeScript recommended (type-aware) rule sets
  //    NOTE: these provide rules; we add parserOptions in a scoped block below.
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // E) Project-scoped settings for TS/React files
  {
    files,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Type-aware: point to your tsconfig
        project: ["./tsconfig.json"],
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

      // Next's fast-refresh plugin (useful if you also run Vite in parts of the repo)
      "react-refresh/only-export-components": "off",

      // Temporary loosening while migrating; tighten later if desired
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
]);
