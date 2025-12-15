import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';
import requests from 'requests';
import { getYouTubeRelativeUri, getYouTubeTvUrl, isYouTubeUrl, tryParseUrl } from 'youtube-utils';

const openSmartTv = async (uri = '', incognito = false) => {
    await chrome.windows.create({
        url: getYouTubeTvUrl(uri),
        state: 'fullscreen',
        focused: true,
        incognito
    });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const isPageLoaded = changeInfo.status === 'complete';
    const url = tryParseUrl(tab.url);
    const isYouTubePage = url && isYouTubeUrl(url);

    if (!isPageLoaded || !isYouTubePage) return;

    const isTvMode = url.pathname.startsWith('/tv');
    const isWatchPage = url.pathname === '/watch';

    if (isWatchPage && !isTvMode) {
        chrome.tabs.sendMessage(tabId, requests.SET_SMART_TV_PLAYER_BUTTON);
    }
});

chrome.runtime.onMessage.addListener(async (request, sender) => {
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
            if (tabId != null) chrome.tabs.remove(tabId);
            break;
        }
    }
});

chrome.action.onClicked.addListener(async () => {
    await openSmartTv();
});
