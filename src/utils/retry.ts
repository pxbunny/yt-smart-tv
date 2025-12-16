export interface RetryOptions {
    timeoutMs?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffFactor?: number;
    observeMutations?: boolean;
    observerRoot?: Node | null;
}

export const retryUntil = (callback: () => boolean, options: RetryOptions = {}): void => {
    const {
        timeoutMs = 5 * 60 * 1000,
        initialDelayMs = 200,
        maxDelayMs = 5 * 1000,
        backoffFactor = 1.5,
        observeMutations = true,
        observerRoot = document.documentElement ?? document.body
    } = options;

    if (callback()) return;

    const deadline = Date.now() + timeoutMs;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let delayMs = initialDelayMs;
    let observer: MutationObserver | undefined;

    const cleanup = () => {
        if (timeoutId != null) clearTimeout(timeoutId);
        observer?.disconnect();
    };

    const scheduleNextAttempt = () => {
        const now = Date.now();
        if (now >= deadline) {
            cleanup();
            return;
        }

        const remainingMs = deadline - now;
        const nextDelayMs = Math.min(delayMs, remainingMs);

        timeoutId = setTimeout(attempt, nextDelayMs);
        delayMs = Math.min(maxDelayMs, Math.round(delayMs * backoffFactor));
    };

    const attempt = () => {
        if (callback()) {
            cleanup();
            return;
        }

        scheduleNextAttempt();
    };

    if (observeMutations && observerRoot) {
        let pending = false;

        observer = new MutationObserver(() => {
            if (pending) return;
            pending = true;

            queueMicrotask(() => {
                pending = false;
                if (callback()) cleanup();
            });
        });

        observer.observe(observerRoot, { childList: true, subtree: true });
    }

    scheduleNextAttempt();
};
