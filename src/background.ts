import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';
import { handleTvModeExit } from 'exit-handler';

const openSmartTv = async () => {
    const smartTvWindow = await chrome.windows.create({
        url: 'https://www.youtube.com/tv',
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

chrome.runtime.onMessage.addListener(async (request, sender) => {
    if (request === 'open-smart-tv') {
        await openSmartTv();
    }

    if (request === 'exit-smart-tv') {
        sender.tab?.id && chrome.tabs.remove(sender.tab.id);
    }
});

chrome.action.onClicked.addListener(async () => {
    await openSmartTv();
});
