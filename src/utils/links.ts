export async function openYouTubeTv(uri = '', options: BehaviorOptions, incognito = false) {
  const { openInNewWindow, openInFullscreen } = options;

  const openYouTubeTvInNewWindow = async () =>
    await browser.windows.create({
      url: getYouTubeTvUrl(uri),
      state: openInFullscreen ? 'fullscreen' : undefined,
      focused: true,
      incognito
    });

  const openYouTubeTvInNewTab = async () =>
    await browser.tabs.create({
      url: getYouTubeTvUrl(uri),
      active: true
    });

  if (openInNewWindow) {
    await openYouTubeTvInNewWindow();
    return;
  }

  await openYouTubeTvInNewTab();
}

export async function openYouTube() {
  await browser.tabs.create({ url: 'https://www.youtube.com/' });
}

export async function openOptions() {
  await browser.runtime.openOptionsPage();
}
