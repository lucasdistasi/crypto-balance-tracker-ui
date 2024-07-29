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
      '@typescript-eslint/prefer-as-const': 'warn', // Enforce the use of as const over literal type
      '@typescript-eslint/no-explicit-any': 'warn', // Disallow the any type

      // TODO
      //'@typescript-eslint/no-unsafe-argument': 'warn', // Disallow calling a function with a value with type any

      '@typescript-eslint/no-unsafe-assignment': 'warn', // Disallow assigning a value with type any to variables and properties
      '@typescript-eslint/no-unsafe-call': 'warn', // Disallow calling a value with type any
      '@typescript-eslint/no-unsafe-member-access': 'warn', // Disallow member access on a value with type any
      '@typescript-eslint/no-unsafe-return': 'warn', // Disallow returning a value with type any from a function
      '@typescript-eslint/restrict-template-expressions': 'warn', // Enforce template literal expressions to be of string type
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
