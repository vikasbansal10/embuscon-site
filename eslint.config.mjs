// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

// ① Ignore generated/build output
const ignores = [
  '**/node_modules/**',
  '.next/**',
  '.contentlayer/**',
  'public/**',
  'dist/**',
  'build/**',
  '.vercel/**',
  'coverage/**',
  'tailwind.config.ts',
];

// ② Limit linting to your source dirs (add/remove as you need)
const files = [
  'app/**/*.{ts,tsx,js,jsx}',
  'components/**/*.{ts,tsx,js,jsx}',
  'lib/**/*.{ts,tsx,js,jsx}',
  'pages/**/*.{ts,tsx,js,jsx}',
  'scripts/**/*.{ts,tsx,js,jsx}',
];

// ③ Build the flat config array once, then export it once
const config = [
  { ignores },

  // Base + TypeScript (type-aware) + React hooks
  ...tseslint.config({
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files,
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'off',

      // Loosen while you migrate; tighten later if you want
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  }),
];

export default config; // <— single default export
