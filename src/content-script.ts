import SmartTvButton from 'components/smart-tv-button.svelte';
import SmartTvPlayerButton from 'components/smart-tv-player-button.svelte';
import requests from 'requests';
import { mount } from 'svelte';
import { getUrlWithTimestamp } from 'youtube-utils';

const { sendMessage, onMessage } = chrome.runtime;

const addSmartTvButton = (): boolean => {
    const buttonId = 'smart-tv-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('#items.ytd-guide-section-renderer');

    if (!target) return false;

    mount(SmartTvButton, {
        target,
        props: {
            id: buttonId,
            onclick: () => sendMessage(requests.OPEN_SMART_TV)
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

    mount(SmartTvButton, {
        target: target,
        props: {
            id: buttonId,
            mini: true,
            onclick: () => sendMessage(requests.OPEN_SMART_TV)
        }
    });

    return true;
};

const setSmartTvPlayerButton = (): boolean => {
    const buttonId = 'smart-tv-player-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('.ytp-right-controls');
    const anchor = document.querySelector('.ytp-fullscreen-button');

    if (!target) return false;

    const handleClick = () => {
        const video = document.querySelector('video');

        video?.pause();

        const currentTime = video?.currentTime ?? 0;
        const urlWithTimestamp = getUrlWithTimestamp(window.location.href, currentTime);
        history.replaceState(null, '', urlWithTimestamp);

        sendMessage(requests.OPEN_SMART_TV_WITH_URI);
    };

    mount(SmartTvPlayerButton, {
        target,
        anchor: anchor ?? undefined,
        props: {
            id: buttonId,
            onclick: handleClick
        }
    });

    return true;
};

const handleRetries = (callback: () => boolean, delay = 200, maxAttempts = 100): void => {
    let attempts = 0;

    const interval = setInterval(() => {
        attempts += 1;
        if (callback() || attempts >= maxAttempts) clearInterval(interval);
    }, delay);
};

handleRetries(addSmartTvButton);
handleRetries(addSmartTvMiniButton);

onMessage.addListener(request => {
    if (request === requests.SET_SMART_TV_PLAYER_BUTTON) {
        handleRetries(setSmartTvPlayerButton);
    }
});
