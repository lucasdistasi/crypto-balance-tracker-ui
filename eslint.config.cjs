const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow omitting return types for React components
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_$' }], // Detect unused variables
      '@typescript-eslint/prefer-as-const': 'warn',
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
      'react/react-in-jsx-scope': 'off', // No need to import React when using JSX with Vite
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: [
      'dist/**/*', '.eslintrc.cjs', 'eslint.config.cjs', 'tailwind.config.js', 'postcss.config.js'
    ],
  }
];
