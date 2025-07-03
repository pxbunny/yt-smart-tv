import * as esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

import { resolveFilePath } from './utils.mjs';

await esbuild.build({
  entryPoints: [resolveFilePath('src', 'content-script.ts')],
  outfile: resolveFilePath('dist', 'yt-smart-tv.js'),
  plugins: [sveltePlugin({ preprocess: sveltePreprocess() })],
  bundle: true,
}).catch(() => process.exit(1));
