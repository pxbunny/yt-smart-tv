import { mount } from 'svelte';

import SmartTvButton from '~/components/content/smart-tv-button.svelte';
import SmartTvPlayerButton from '~/components/content/smart-tv-player-button.svelte';

const SMART_TV_BUTTON_ID = 'smart-tv-button';
const SMART_TV_MINI_BUTTON_ID = 'smart-tv-mini-button';
const SMART_TV_PLAYER_BUTTON_ID = 'smart-tv-player-button';

const supportedOptionKeys = new Set<OptionKey>([
  'showGuideButton',
  'showMiniGuideButton',
  'showPlayerButton'
]);

let guideButtonRetry: RetryHandle | undefined;
let miniGuideButtonRetry: RetryHandle | undefined;
let playerButtonRetry: RetryHandle | undefined;

/**
 * Content script entrypoint for regular YouTube pages (not `/tv`).
 *
 * @remarks
 * Injects "Smart TV" buttons into different parts of the YouTube UI and reacts to option changes
 * via `browser.storage.onChanged`.
 */
export default defineContentScript({
  matches: ['https://*.youtube.com/*'],
  excludeMatches: ['https://*.youtube.com/tv*'],
  runAt: 'document_end',
  async main() {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'sync') return;

      for (const [key, change] of Object.entries(changes)) {
        const { newValue } = change;

        const shouldOptionBeSkipped =
          !isOptionKey(key) || !supportedOptionKeys.has(key) || typeof newValue !== 'boolean';

        if (shouldOptionBeSkipped) continue;

        handleOptionChange(key, newValue);
      }
    });

    await initialize();
  }
});

async function initialize(): Promise<void> {
  const { showGuideButton, showMiniGuideButton, showPlayerButton } = await getOptions();

  if (showGuideButton) startGuideButton();
  if (showMiniGuideButton) startMiniGuideButton();
  if (showPlayerButton) startPlayerButton();
}

function handleOptionChange(key: OptionKey, value: boolean): void {
  switch (key) {
    case 'showGuideButton':
      if (value) startGuideButton();
      else stopGuideButton();
      break;
    case 'showMiniGuideButton':
      if (value) startMiniGuideButton();
      else stopMiniGuideButton();
      break;
    case 'showPlayerButton':
      if (value) startPlayerButton();
      else stopPlayerButton();
      break;
  }
}

function startGuideButton(): void {
  guideButtonRetry?.cancel();
  guideButtonRetry = retryUntil(
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
}

function startMiniGuideButton(): void {
  miniGuideButtonRetry?.cancel();
  miniGuideButtonRetry = retryUntil(
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
}

function startPlayerButton(): void {
  playerButtonRetry?.cancel();
  playerButtonRetry = retryUntil(addSmartTvPlayerButton, {
    observerRoot: document.querySelector('#player') ?? document.body
  });
}

function stopGuideButton(): void {
  guideButtonRetry?.cancel();
  guideButtonRetry = undefined;
  removeById(SMART_TV_BUTTON_ID);
}

function stopMiniGuideButton(): void {
  miniGuideButtonRetry?.cancel();
  miniGuideButtonRetry = undefined;
  removeById(SMART_TV_MINI_BUTTON_ID);
}

function stopPlayerButton(): void {
  playerButtonRetry?.cancel();
  playerButtonRetry = undefined;
  removeById(SMART_TV_PLAYER_BUTTON_ID);
}

function removeById(id: string): void {
  document.getElementById(id)?.remove();
}

function addSmartTvButton(buttonId: string, target: Element, mini = false): boolean {
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
}

function addSmartTvPlayerButton(): boolean {
  if (document.getElementById(SMART_TV_PLAYER_BUTTON_ID)) return true;

  const target = document.querySelector('.ytp-right-controls');
  const anchor = target?.querySelector('.ytp-fullscreen-button');

  if (!target) return false;

  const handleClick = (): void => {
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
}
