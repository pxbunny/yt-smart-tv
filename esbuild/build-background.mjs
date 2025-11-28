import * as esbuild from 'esbuild';

import { resolveFilePath } from './utils.mjs';

const isWatchMode = process.argv.includes('--watch');

const buildOptions = {
    entryPoints: [resolveFilePath('src', 'background.ts')],
    outfile: resolveFilePath('dist', 'background.js'),
    bundle: true,
    minify: !isWatchMode,
    sourcemap: isWatchMode,
    logLevel: 'info'
};

const buildBackground = async () => {
    if (!isWatchMode) {
        await esbuild.build(buildOptions);
        return;
    }

    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('Watching background script for changes...');
};

buildBackground().catch(error => {
    console.error(error);
    process.exit(1);
});
