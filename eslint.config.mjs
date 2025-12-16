import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

import autoImports from './.wxt/eslint-auto-imports.mjs';

export default defineConfig(
    autoImports,
    {
        ignores: ['node_modules/', '.wxt/', '.output/', '**/*.g.ts']
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    eslintConfigPrettier,
    {
        plugins: {
            'simple-import-sort': simpleImportSort
        },
        rules: {
            'simple-import-sort/exports': 'warn',
            'simple-import-sort/imports': 'warn',
        }
    }
);
