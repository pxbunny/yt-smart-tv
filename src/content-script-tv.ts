import requests from 'requests';

const TIMEOUT_MS = 200;

const OVERLAY_CONTAINER_SELECTOR = 'yt-unified-overlay-stage > zylon-provider-3';
const TEXT_ELEMENT_SELECTOR = 'yt-formatted-string';
const EXIT_HEADER_CONTENT = 'Exit YouTube';

let requestAlreadySent = false;

const sendExitRequestOnce = () => {
    if (requestAlreadySent) return;

    requestAlreadySent = true;
    chrome.runtime.sendMessage(requests.CLOSE_SMART_TV);
};

const isExitScreenDisplayed = (container: Element) => {
    const headers = container.querySelectorAll(TEXT_ELEMENT_SELECTOR);

    return Array.from(headers).some(
        header => header.textContent.trim().toLowerCase() === EXIT_HEADER_CONTENT.toLowerCase()
    );
};

const setTvModeExitScreenObserver = (container: Element) => {
    const observer = new MutationObserver((mutations, observer) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length < 1 || !isExitScreenDisplayed(container)) return;

            observer.disconnect();
            sendExitRequestOnce();
        });
    });

    const mutationOptions = { childList: true, subtree: true };
    observer.observe(container, mutationOptions);
};

const handleTvModeExit = () => {
    const container = document.querySelector(OVERLAY_CONTAINER_SELECTOR);

    if (!container) {
        setTimeout(() => handleTvModeExit(), TIMEOUT_MS);
        return;
    }

    if (isExitScreenDisplayed(container)) {
        sendExitRequestOnce();
        return;
    }

    setTvModeExitScreenObserver(container);
};

setTimeout(handleTvModeExit, TIMEOUT_MS);
