import { defineConfig } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import lingui from 'eslint-plugin-lingui'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default defineConfig(
  nextCoreWebVitals,
  // The Next config registers the import plugin already, take only its rules
  { rules: importPlugin.flatConfigs.recommended.rules },
  tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
    plugins: {
      lingui,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys,
      'sort-keys-fix': sortKeysFix,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/ignore': ['@lingui/macro'],
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      curly: ['error', 'all'],
      'import/order': 'off',
      'prefer-template': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'sort-keys': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'no-console': ['error', { allow: ['error'] }],
      'no-debugger': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-implicit-coercion': [
        'error',
        {
          boolean: true,
          string: true,
          number: true,
          disallowTemplateShorthand: true,
          allow: ['!!'],
        },
      ],
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'sort-keys-fix/sort-keys-fix': ['error', 'asc', { natural: true }],
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['@lingui/core', '@lingui/macro'],
        },
      ],
    },
  },
  {
    files: ['src/config/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@lingui/macro',
              importNames: ['msg'],
            },
          ],
        },
      ],
    },
  },
)
