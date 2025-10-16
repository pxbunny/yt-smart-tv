import requests from 'requests';

const timeoutDelayMs = 200;

const isExitHeaderDisplayed = () => {
    const query = `yt-formatted-string[idomkey="ytLrOverlayPanelHeaderRendererTitle"]`;
    const headers = document.querySelectorAll(query);
    const exitHeader = Array.from(headers).find(el => el.textContent === 'Exit YouTube');
    return !!exitHeader;
};

const callback: MutationCallback = (mutationList: MutationRecord[], observer: MutationObserver) => {
    mutationList.forEach(mutation => {
        if (mutation.addedNodes.length < 1 || !isExitHeaderDisplayed()) return;

        observer.disconnect();
        chrome.runtime.sendMessage(requests.CLOSE_SMART_TV);
    });
};

const timeoutHandler = () => {
    const exitScreenContainer = document.querySelector('zylon-provider-3');

    if (!exitScreenContainer) {
        setTimeout(timeoutHandler, timeoutDelayMs);
        return;
    }

    if (isExitHeaderDisplayed()) {
        chrome.runtime.sendMessage(requests.CLOSE_SMART_TV);
        return;
    }

    new MutationObserver(callback).observe(exitScreenContainer, { childList: true });
};

setTimeout(timeoutHandler, timeoutDelayMs);
