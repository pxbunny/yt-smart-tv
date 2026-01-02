const OVERLAY_SELECTOR = 'yt-unified-overlay-stage';
const TEXT_ELEMENT_SELECTOR = 'yt-formatted-string';
const EXIT_HEADER_CONTENT = 'Exit YouTube';

export default defineContentScript({
  matches: ['https://*.youtube.com/tv*'],
  runAt: 'document_end',
  main() {
    retryUntil(
      () => {
        const overlay = document.querySelector(OVERLAY_SELECTOR);

        if (!overlay) return false;

        handleExit(overlay);
        return true;
      },
      {
        retryIndefinitely: true
      }
    );
  }
});

let requestAlreadySent = false;

function handleExit(overlay: Element): void {
  retryUntil(
    () => {
      if (!isExitScreenDisplayed(overlay)) return false;

      sendExitRequestOnce();
      return true;
    },
    {
      retryIndefinitely: true,
      initialDelayMs: 3_000,
      maxDelayMs: 3_000,
      backoffFactor: 1,
      observerRoot: overlay
    }
  );
}

function sendExitRequestOnce(): void {
  if (requestAlreadySent) return;

  requestAlreadySent = true;
  browser.runtime.sendMessage(requests.CLOSE_SMART_TV);
}

function isExitScreenDisplayed(container: Element): boolean {
  const headers = container.querySelectorAll(TEXT_ELEMENT_SELECTOR);
  const expectedHeaderContent = EXIT_HEADER_CONTENT.toLowerCase();
  return Array.from(headers).some(
    header => header.textContent?.trim().toLowerCase() === expectedHeaderContent
  );
}
