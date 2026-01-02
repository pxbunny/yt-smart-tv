/**
 * Opens YouTube TV either in a new window or a new tab.
 *
 * @param uri - Optional relative URI to open (e.g. `/watch?v=...` or `?v=...`).
 * @param options - Behavior options controlling window/tab mode.
 * @param incognito - Whether to open the window in incognito/private mode (only applies to window mode).
 */
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

/**
 * Opens `https://www.youtube.com/` in a new tab.
 */
export async function openYouTube() {
  await browser.tabs.create({ url: 'https://www.youtube.com/' });
}

/**
 * Opens the extension options page.
 */
export async function openOptions() {
  await browser.runtime.openOptionsPage();
}
