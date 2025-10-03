import requests from 'requests';

const callback: MutationCallback = (mutationList: MutationRecord[], observer: MutationObserver) => {
    mutationList.forEach(mutation => {
        if (mutation.addedNodes.length < 1) return;

        const query = `yt-formatted-string[idomkey="ytLrOverlayPanelHeaderRendererTitle"]`;
        const exitHeader = Array.from(document.querySelectorAll(query)).find(
            el => el.textContent === 'Exit YouTube'
        );

        if (!exitHeader) return;

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

    new MutationObserver(callback).observe(exitScreenContainer, { childList: true });
};

const timeoutDelayMs = 200;
setTimeout(timeoutHandler, timeoutDelayMs);
