import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    name: 'YouTube Smart TV',
    description: 'One-click launcher for the TV version of YouTube.',
    version: '1.0.0',
    homepage_url: 'https://github.com/pxbunny/yt-smart-tv',
    permissions: ['declarativeNetRequest', 'storage'],
    host_permissions: ['https://*.youtube.com/*']
  }
});
