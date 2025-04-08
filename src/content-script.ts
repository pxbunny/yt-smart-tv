import SmartTvButton from 'components/smart-tv-button.svelte';

const sendSignal = () => chrome.runtime.sendMessage({ signal: 'smart-tv' });

const addSmartTvButton = () => {
    const buttonId = 'smart-tv-button';

    if (document.getElementById(buttonId)) return true;

    const target = document.querySelector('#items.ytd-guide-section-renderer');
    const anchor = document.querySelector('#items > ytd-guide-collapsible-section-entry-renderer');

    if (!target || !anchor) return false;

    new SmartTvButton({
        target,
        anchor,
        props: {
            id: buttonId,
            onClick: sendSignal
        }
    });

    return true;
};

const addSmartTvMiniButton = (observeTargetMutations = true) => {
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
