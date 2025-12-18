import { mount } from 'svelte';

import SmartTvButton from '~/components/smart-tv-button.svelte';
import SmartTvPlayerButton from '~/components/smart-tv-player-button.svelte';

export default defineContentScript({
    matches: ['https://*.youtube.com/*'],
    excludeMatches: ['https://*.youtube.com/tv*'],
    runAt: 'document_end',
    main() {
        retryUntil(
            () => {
                const target = document.querySelector('#items.ytd-guide-section-renderer');
                if (!target) return false;
                return addSmartTvButton('smart-tv-button', target);
            },
            {
                retryIndefinitely: true,
                observerRoot: document.querySelector('tp-yt-app-drawer') ?? document.body
            }
        );

        retryUntil(
            () => {
                const target = document.querySelector('#items.ytd-mini-guide-renderer');
                if (!target) return false;
                return addSmartTvButton('smart-tv-mini-button', target, true);
            },
            {
                retryIndefinitely: true,
                observerRoot: document.querySelector('ytd-mini-guide-renderer') ?? document.body
            }
        );

        browser.runtime.onMessage.addListener(request => {
            if (request === requests.SET_SMART_TV_PLAYER_BUTTON) {
                retryUntil(setSmartTvPlayerButton, {
                    observerRoot: document.querySelector('#player') ?? document.body
                });
            }
        });
    }
});

const addSmartTvButton = (buttonId: string, target: Element, mini = false): boolean => {
    if (document.getElementById(buttonId)) return true;
    if (target.children.length < 1) return false;

    const anchor = target.querySelector(':has(#endpoint[title*="shorts" i]) + *');

    mount(SmartTvButton, {
        target,
        anchor: anchor ?? undefined,
        props: {
            id: buttonId,
            mini,
            onclick: () => browser.runtime.sendMessage(requests.OPEN_SMART_TV)
        }
    });

    return true;
};

const setSmartTvPlayerButton = (): boolean => {
    const buttonId = 'smart-tv-player-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('.ytp-right-controls');
    const anchor = target?.querySelector('.ytp-fullscreen-button');

    if (!target) return false;

    const handleClick = () => {
        const video = document.querySelector('video');

        video?.pause();

        const currentTime = video?.currentTime ?? 0;
        const urlWithTimestamp = getUrlWithTimestamp(window.location.href, currentTime);
        history.replaceState(null, '', urlWithTimestamp);

        browser.runtime.sendMessage(requests.OPEN_SMART_TV_WITH_URI);
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
