import { getUserAgentUpdateRuleOptions } from 'dynamic-rules';

const openSmartTvWindow = () => {
    chrome.windows.create({
        url: 'https://www.youtube.com/tv',
        type: 'popup',
        state: 'fullscreen'
    });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
});

chrome.runtime.onMessage.addListener(request => {
    if (request.signal !== 'smart-tv') return;
    openSmartTvWindow();
});

chrome.action.onClicked.addListener(() => {
    openSmartTvWindow();
});
