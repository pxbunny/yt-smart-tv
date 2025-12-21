import { mount } from 'svelte';

import SmartTvButton from '~/components/smart-tv-button.svelte';
import SmartTvPlayerButton from '~/components/smart-tv-player-button.svelte';

const SMART_TV_BUTTON_ID = 'smart-tv-button';
const SMART_TV_MINI_BUTTON_ID = 'smart-tv-mini-button';
const SMART_TV_PLAYER_BUTTON_ID = 'smart-tv-player-button';

export default defineContentScript({
    matches: ['https://*.youtube.com/*'],
    excludeMatches: ['https://*.youtube.com/tv*'],
    runAt: 'document_end',
    async main() {
        browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName !== 'sync') return;

            for (const [key, change] of Object.entries(changes)) {
                const { newValue } = change;
                const acceptedKeys: OptionKey[] = [
                    'showGuideButton',
                    'showMiniGuideButton',
                    'showPlayerButton'
                ];

                if (!acceptedKeys.includes(key as OptionKey)) continue;

                handleOptionChange(key as OptionKey, newValue as boolean);
            }
        });

        initialize();
    }
});

const handleOptionChange = (key: OptionKey, value: boolean) => {
    switch (key) {
        case 'showGuideButton':
            if (value) setSmartTvButton();
            else removeById(SMART_TV_BUTTON_ID);
            break;
        case 'showMiniGuideButton':
            if (value) setSmartTvMiniButton();
            else removeById(SMART_TV_MINI_BUTTON_ID);
            break;
        case 'showPlayerButton':
            if (value) setSmartTvPlayerButton();
            else removeById(SMART_TV_PLAYER_BUTTON_ID);
            break;
    }
};

const initialize = async () => {
    const { showGuideButton, showMiniGuideButton, showPlayerButton } = await getOptions();

    if (showGuideButton) setSmartTvButton();
    if (showMiniGuideButton) setSmartTvMiniButton();
    if (showPlayerButton) setSmartTvPlayerButton();
};

const setSmartTvButton = () =>
    retryUntil(
        () => {
            const target = document.querySelector('#items.ytd-guide-section-renderer');
            if (!target) return false;
            return addSmartTvButton(SMART_TV_BUTTON_ID, target);
        },
        {
            retryIndefinitely: true,
            observerRoot: document.querySelector('tp-yt-app-drawer') ?? document.body
        }
    );

const setSmartTvMiniButton = () =>
    retryUntil(
        () => {
            const target = document.querySelector('#items.ytd-mini-guide-renderer');
            if (!target) return false;
            return addSmartTvButton(SMART_TV_MINI_BUTTON_ID, target, true);
        },
        {
            retryIndefinitely: true,
            observerRoot: document.querySelector('ytd-mini-guide-renderer') ?? document.body
        }
    );

const setSmartTvPlayerButton = () =>
    retryUntil(addSmartTvPlayerButton, {
        observerRoot: document.querySelector('#player') ?? document.body
    });

const removeById = (id: string) => document.getElementById(id)?.remove();

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

const addSmartTvPlayerButton = (): boolean => {
    if (document.getElementById(SMART_TV_PLAYER_BUTTON_ID)) return true;

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
            id: SMART_TV_PLAYER_BUTTON_ID,
            onclick: handleClick
        }
    });

    return true;
};
