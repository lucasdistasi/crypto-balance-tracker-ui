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
      '@typescript-eslint/no-unsafe-argument': 'warn', // Disallow calling a function with a value with type any
      '@typescript-eslint/no-unsafe-assignment': 'warn', // Disallow assigning a value with type any to variables and properties
      '@typescript-eslint/no-unsafe-call': 'warn', // Disallow calling a value with type any
      '@typescript-eslint/no-unsafe-member-access': 'warn', // Disallow member access on a value with type any
      '@typescript-eslint/no-unsafe-return': 'warn', // Disallow returning a value with type any from a function
      '@typescript-eslint/restrict-template-expressions': 'warn', // Enforce template literal expressions to be of string type
      '@typescript-eslint/ban-tslint-comment': 'warn', // Disallow // tslint:<rule-flag> comments
      '@typescript-eslint/prefer-for-of': 'warn', // Enforce the use of for-of loop over the standard for loop where possible
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Enforce using the nullish coalescing operator instead of logical assignments or chaining
      '@typescript-eslint/no-duplicate-enum-values': 'warn', // Disallow duplicate enum member values
      '@typescript-eslint/no-extra-non-null-assertion': 'warn', // Disallow extra non-null assertions
      '@typescript-eslint/unbound-method': 'warn', // Enforce unbound methods are called with their expected scope
      '@typescript-eslint/triple-slash-reference': 'warn', // Disallow certain triple slash directives in favor of ES6-style import declarations
      '@typescript-eslint/require-await': 'warn', // Disallow async functions which do not return promises and have no await expression
      '@typescript-eslint/no-var-requires': 'warn', // Disallow require statements except in import statements
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn', // Disallow comparing an enum value with a non-enum value
      '@typescript-eslint/no-unsafe-declaration-merging': 'warn', // Disallow unsafe declaration merging
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn', // Disallow unnecessary constraints on generic types
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn', // Disallow type assertions that do not change the type of an expression
      '@typescript-eslint/no-this-alias': 'warn', // Disallow aliasing this
      '@typescript-eslint/no-namespace': 'warn', // Disallow TypeScript namespaces
      '@typescript-eslint/no-misused-new': 'warn', // Enforce valid definition of new and constructor
      '@typescript-eslint/no-loss-of-precision': 'warn', // Disallow literal numbers that lose precision
      '@typescript-eslint/no-implied-eval': 'warn', // Disallow the use of eval()-like methods
      '@typescript-eslint/no-duplicate-type-constituents': 'warn', // Disallow duplicate constituents of union or intersection types
      '@typescript-eslint/no-base-to-string': 'warn', // Require .toString() to only be called on objects which provide useful information when stringified
      '@typescript-eslint/no-array-constructor': 'warn', // Disallow generic Array constructors
      '@typescript-eslint/ban-ts-comment': 'warn', // Disallow @ts-<directive> comments or require descriptions after directives
      '@typescript-eslint/await-thenable': 'warn', // Disallow awaiting a value that is not a Thenable
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
      'react/react-in-jsx-scope': 'off', // No need to import React when using JSX with Vite
      'react-hooks/rules-of-hooks': 'warn', // Checks rules of Hooks
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignores: [
      'node_modules//*',
      'dist//*',
      '.eslintrc.cjs',
      'eslint.config.cjs',
      'postcss.config.js'
    ],
  }
];
