import { getUserAgentUpdateRuleOptions } from '~/dynamic-rules';

/**
 * Background entrypoint.
 *
 * @remarks
 * - Installs a Declarative Net Request rule to set a custom User-Agent for `youtube.com/tv`.
 * - Handles runtime messages from content scripts (open/close Smart TV window).
 */
export default defineBackground(() => {
  const lazyOptions = new LazyOptions();

  browser.runtime.onInstalled.addListener(async () => {
    await browser.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
  });

  browser.runtime.onMessage.addListener(async (request, sender) => {
    const isIncognito = sender.tab?.incognito ?? false;

    switch (request) {
      case requests.OPEN_SMART_TV: {
        const options = await lazyOptions.get();
        await openYouTubeTv('', options, isIncognito);
        break;
      }

      case requests.OPEN_SMART_TV_WITH_URI: {
        const uri = getYouTubeRelativeUri(sender.tab?.url);
        const options = await lazyOptions.get();
        await openYouTubeTv(uri, options, isIncognito);
        break;
      }

      case requests.CLOSE_SMART_TV: {
        const tabId = sender.tab?.id;
        if (tabId !== undefined) await browser.tabs.remove(tabId);
        break;
      }
    }
  });
});
