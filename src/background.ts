import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';

const BASE_URL = 'https://www.youtube.com';

const openSmartTv = async (uri?: string) => {
    await chrome.windows.create({
        url: `${BASE_URL}/tv` + uri,
        state: 'fullscreen',
        focused: true
    });

    // chrome.scripting.executeScript({
    //     target: { tabId: smartTvWindow.tabs![0].id! },
    //     injectImmediately: true,
    //     func: handleTvModeExit
    // });
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
        chrome.tabs.sendMessage(tabId, 'set-smart-tv-player-button');
    }
});

chrome.runtime.onMessage.addListener(async (request, sender) => {
    if (request === 'open-smart-tv') {
        await openSmartTv();
    }

    if (request === 'open-smart-tv-with-uri') {
        const uri = sender.tab?.url?.replace(BASE_URL, '');
        await openSmartTv(uri);
    }

    if (request === 'exit-smart-tv') {
        sender.tab?.id && chrome.tabs.remove(sender.tab.id);
    }
});

chrome.action.onClicked.addListener(async () => {
    await openSmartTv();
});
