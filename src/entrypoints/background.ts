import { getUserAgentUpdateRuleOptions } from '~/dynamic-rules';

export default defineBackground(() => {
    const lazyOptions = new LazyOptions();

    browser.runtime.onInstalled.addListener(() => {
        browser.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
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
                if (tabId) browser.tabs.remove(tabId);
                break;
            }
        }
    });
});
