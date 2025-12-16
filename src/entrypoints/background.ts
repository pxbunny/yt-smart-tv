import { getUserAgentUpdateRuleOptions } from '@/dynamic-rules';

export default defineBackground(() => {
    browser.runtime.onInstalled.addListener(() => {
        browser.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
    });

    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        const isPageLoaded = changeInfo.status === 'complete';
        const url = tryParseUrl(tab.url);
        const isYouTubePage = url && isYouTubeUrl(url);

        if (!isPageLoaded || !isYouTubePage) return;

        const isTvMode = url.pathname.startsWith('/tv');
        const isWatchPage = url.pathname === '/watch';

        if (isWatchPage && !isTvMode) {
            browser.tabs.sendMessage(tabId, requests.SET_SMART_TV_PLAYER_BUTTON);
        }
    });

    browser.runtime.onMessage.addListener(async (request, sender) => {
        const isIncognito = sender.tab?.incognito ?? false;

        switch (request) {
            case requests.OPEN_SMART_TV: {
                await openSmartTv('', isIncognito);
                break;
            }

            case requests.OPEN_SMART_TV_WITH_URI: {
                const uri = getYouTubeRelativeUri(sender.tab?.url);
                await openSmartTv(uri, isIncognito);
                break;
            }

            case requests.CLOSE_SMART_TV: {
                const tabId = sender.tab?.id;
                if (tabId != null) browser.tabs.remove(tabId);
                break;
            }
        }
    });

    browser.action.onClicked.addListener(async () => {
        await openSmartTv();
    });

    const openSmartTv = async (uri = '', incognito = false) => {
        await browser.windows.create({
            url: getYouTubeTvUrl(uri),
            state: 'fullscreen',
            focused: true,
            incognito
        });
    };
});
