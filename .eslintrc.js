const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')
const prettierConfig = require('./.prettierrc.js')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'next',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'simple-import-sort',
    'import'
  ],
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    '@next/next/no-html-link-for-pages': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': ['error', {
      allow: ['info', 'warn', 'error'],
    }],
  },
  ignorePatterns: [
    'node_modules/',
    '.eslintrc.js',
    '.prettierrc.js',
    'next.config.js',
    'postcss.config.js',
  ],
}
