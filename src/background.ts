import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';
import { handleExitButton } from 'exit-handler';

const openSmartTvWindow = async () => {
    const smartTvWindow = await chrome.windows.create({
        url: 'https://www.youtube.com/tv',
        state: 'fullscreen',
        focused: true
    });

    if (!smartTvWindow?.tabs) return;

    const tabId = smartTvWindow.tabs[0].id;

    if (!tabId) return;

    chrome.scripting.executeScript({
        target: { tabId },
        injectImmediately: true,
        func: handleExitButton
    });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
});

chrome.runtime.onMessage.addListener(async (request, sender) => {
    if (request === 'open-smart-tv') {
        await openSmartTvWindow();
    }

    if (request === 'exit-smart-tv') {
        sender.tab?.id && chrome.tabs.remove(sender.tab.id);
    }
});

chrome.action.onClicked.addListener(async () => {
    await openSmartTvWindow();
});
