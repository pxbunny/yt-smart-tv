import SmartTvButton from 'components/smart-tv-button.svelte';
import SmartTvPlayerButton from 'components/smart-tv-player-button.svelte';

const sendSignal = (samePage: boolean = false): void => {
    const message = samePage ? 'open-smart-tv-with-uri' : 'open-smart-tv';
    chrome.runtime.sendMessage(message);
};

const addSmartTvButton = (): boolean => {
    const buttonId = 'smart-tv-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('#items.ytd-guide-section-renderer');
    const anchor = document.querySelector('#items > ytd-guide-collapsible-section-entry-renderer');

    if (!target) return false;

    new SmartTvButton({
        target,
        anchor: anchor ?? undefined,
        props: {
            id: buttonId,
            onClick: sendSignal
        }
    });

    return true;
};

const addSmartTvMiniButton = (observeTargetMutations = true): boolean => {
    const buttonId = 'smart-tv-mini-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('#items.ytd-mini-guide-renderer');

    if (!target) return false;

    if (observeTargetMutations) {
        new MutationObserver((mutations, observer) => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length < 2) return;
                observer.disconnect();
                addSmartTvMiniButton(false);
            });
        }).observe(target, { childList: true });
    }

    new SmartTvButton({
        target: target,
        props: {
            id: buttonId,
            mini: true,
            onClick: sendSignal
        }
    });

    return true;
};

const addSmartTvPlayerButton = (): boolean => {
    const buttonId = 'smart-tv-player-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('.ytp-right-controls');
    const anchor = document.querySelector('.ytp-miniplayer-button');

    if (!target) return false;

    const handleClick = () => {
        const video = document.querySelector('video');
        video?.pause();
        sendSignal(true);
    };

    new SmartTvPlayerButton({
        target,
        anchor: anchor ?? undefined,
        props: {
            id: buttonId,
            onClick: handleClick
        }
    });

    return true;
};

const setButton = (
    callback: typeof addSmartTvButton | typeof addSmartTvMiniButton,
    delay = 200
) => {
    const interval = setInterval(() => {
        if (callback()) clearInterval(interval);
    }, delay);
};

setButton(addSmartTvButton);
setButton(addSmartTvMiniButton);

chrome.runtime.onMessage.addListener(request => {
    if (request === 'set-smart-tv-player-button') {
        setButton(addSmartTvPlayerButton);
    }
});
