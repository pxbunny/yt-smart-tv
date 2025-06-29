import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';
import { handleTvModeExit } from 'exit-handler';

const openSmartTv = async (uri?: string) => {
    const smartTvWindow = await chrome.windows.create({
        url: 'https://www.youtube.com/tv' + uri,
        state: 'fullscreen',
        focused: true
    });

    chrome.scripting.executeScript({
        target: { tabId: smartTvWindow.tabs![0].id! },
        injectImmediately: true,
        func: handleTvModeExit
    });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const { url } = tab;

    if (changeInfo.status !== 'complete' || !url) return;

    if (url.includes('watch')) {
        chrome.tabs.sendMessage(tabId, 'set-smart-tv-player-button');
    }
});

chrome.runtime.onMessage.addListener(async (request, sender) => {
    if (request === 'open-smart-tv') {
        await openSmartTv();
    }

    if (request === 'open-smart-tv-with-uri') {
        const uri = sender.tab?.url?.replace('https://www.youtube.com', '');
        await openSmartTv(uri);
    }

    if (request === 'exit-smart-tv') {
        sender.tab?.id && chrome.tabs.remove(sender.tab.id);
    }
});

chrome.action.onClicked.addListener(async () => {
    await openSmartTv();
});
