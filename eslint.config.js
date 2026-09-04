import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'course_sheets/**',
      'scripts/output/**',
      'src/data/programManifest.generated.ts',
    ],
  },

  // Application source.
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Flags a real performance smell in useProgramConfigs, but the fix is a
      // behavioural refactor rather than a mechanical one. Kept visible as a
      // warning instead of blocking the build.
      'react-hooks/set-state-in-effect': 'warn',
      // Underscore-prefixed names are the codebase's marker for a deliberately
      // unused binding, most often a discarded destructured field.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },

  // Node scripts and config files.
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,ts}', 'eslint.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      // Underscore marks a deliberately discarded binding, most often a field
      // dropped while destructuring.
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
);
