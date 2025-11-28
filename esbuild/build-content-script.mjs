import * as esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

import { resolveFilePath } from './utils.mjs';

const isWatchMode = process.argv.includes('--watch');

const commonOptions = {
    bundle: true,
    sourcemap: isWatchMode,
    minify: !isWatchMode,
    logLevel: 'info'
};

const buildScript = async (options, label) => {
    if (!isWatchMode) {
        await esbuild.build(options);
        return;
    }

    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log(`Watching ${label} for changes...`);
};

const buildContentScripts = async () => {
    await buildScript(
        {
            entryPoints: [resolveFilePath('src', 'content-script.ts')],
            outfile: resolveFilePath('dist', 'yt-smart-tv.js'),
            plugins: [sveltePlugin({ preprocess: sveltePreprocess() })],
            ...commonOptions
        },
        'content script'
    );

    await buildScript(
        {
            entryPoints: [resolveFilePath('src', 'content-script-tv.ts')],
            outfile: resolveFilePath('dist', 'yt-smart-tv-exit-script.js'),
            ...commonOptions
        },
        'TV exit script'
    );
};

buildContentScripts().catch(error => {
    console.error(error);
    process.exit(1);
});
