import { defineConfig } from 'wxt';

export default defineConfig({
    srcDir: 'src',
    outDir: 'dist',
    modules: ['@wxt-dev/module-svelte'],
    manifest: {
        name: 'YouTube Smart TV',
        version: '0.1.0',
        homepage_url: 'https://github.com/pxbunny/yt-smart-tv',
        permissions: ['declarativeNetRequest', 'tabs'],
        host_permissions: ['https://*.youtube.com/*'],
        action: {}
    }
});
