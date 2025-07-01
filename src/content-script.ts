import SmartTvButton from 'components/smart-tv-button.svelte';
import SmartTvPlayerButton from 'components/smart-tv-player-button.svelte';
import requests from 'requests';

const { sendMessage, onMessage } = chrome.runtime;

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
            onClick: () => sendMessage(requests.OPEN_SMART_TV)
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
            onClick: () => sendMessage(requests.OPEN_SMART_TV)
        }
    });

    return true;
};

const setSmartTvPlayerButton = (): boolean => {
    const buttonId = 'smart-tv-player-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('.ytp-right-controls');
    const anchor = document.querySelector('.ytp-miniplayer-button');

    if (!target) return false;

    const handleClick = () => {
        const video = document.querySelector('video');

        video?.pause();

        const currentTime = video?.currentTime ?? 0;
        const url = new URL(window.location.href);
        url.searchParams.set('t', Math.floor(currentTime).toString());
        history.replaceState(null, '', url.href);

        sendMessage(requests.OPEN_SMART_TV_WITH_URI);
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

const handleRetries = (
    callback: typeof addSmartTvButton | typeof addSmartTvMiniButton,
    delay = 200
): void => {
    const interval = setInterval(() => {
        if (callback()) clearInterval(interval);
    }, delay);
};

handleRetries(addSmartTvButton);
handleRetries(addSmartTvMiniButton);

onMessage.addListener(request => {
    if (request === requests.SET_SMART_TV_PLAYER_BUTTON) {
        handleRetries(setSmartTvPlayerButton);
    }
});
