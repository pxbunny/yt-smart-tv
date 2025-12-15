import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';
import requests from 'requests';

const BASE_URL = 'https://www.youtube.com';

const openSmartTv = async (uri = '', incognito = false) => {
    await chrome.windows.create({
        url: `${BASE_URL}/tv` + uri,
        state: 'fullscreen',
        focused: true,
        incognito
    });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const { url } = tab;

    const isPageLoaded = changeInfo.status === 'complete';
    const isYouTubePage = url && url.includes(BASE_URL);

    if (!isPageLoaded || !isYouTubePage) return;

    if (url.includes('watch') && !url.includes('tv')) {
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
            const uri = sender.tab?.url?.replace(BASE_URL, '') ?? '';
            await openSmartTv(uri, isIncognito);
            break;
        }

        case requests.CLOSE_SMART_TV: {
            const tabId = sender.tab?.id;
            if (tabId !== undefined) chrome.tabs.remove(tabId);
            break;
        }
    }
});

chrome.action.onClicked.addListener(async () => {
    await openSmartTv();
});
