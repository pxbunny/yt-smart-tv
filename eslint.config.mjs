import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {
        ignores: ['node_modules/', 'dist/', 'esbuild/', '**/*.g.ts']
    },
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    eslintConfigPrettier,
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            '@typescript-eslint': tseslint.plugin
        },
        rules: {
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': 'error',
            '@typescript-eslint/unified-signatures': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
);
