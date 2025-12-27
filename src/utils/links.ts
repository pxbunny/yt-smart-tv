export const openYouTubeTv = async (uri = '', options: BehaviorOptions, incognito = false) => {
    const { openInNewWindow, openInFullscreen } = options;

    if (openInNewWindow) {
        await browser.windows.create({
            url: getYouTubeTvUrl(uri),
            state: openInFullscreen ? 'fullscreen' : undefined,
            focused: true,
            incognito
        });
        return;
    }

    await browser.tabs.create({
        url: getYouTubeTvUrl(uri),
        active: true
    });
};

export const openYouTube = async () => {
    await browser.tabs.create({ url: 'https://www.youtube.com/' });
};

export const openOptions = async () => {
    await browser.runtime.openOptionsPage();
};
