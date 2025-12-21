export interface RetryOptions {
    retryIndefinitely?: boolean;
    timeoutMs?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffFactor?: number;
    observeMutations?: boolean;
    observerRoot?: Node | null;
}

export interface RetryHandle {
    cancel: () => void;
}

export const retryUntil = (callback: () => boolean, options: RetryOptions = {}): RetryHandle => {
    const {
        retryIndefinitely = false,
        timeoutMs = 5 * 60 * 1000,
        initialDelayMs = 200,
        maxDelayMs = 5 * 1000,
        backoffFactor = 1.5,
        observeMutations = true,
        observerRoot = document.documentElement ?? document.body
    } = options;

    let active = true;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let delayMs = initialDelayMs;
    let observer: MutationObserver | undefined;

    const cleanup = () => {
        clearTimeout(timeoutId);
        observer?.disconnect();
        timeoutId = undefined;
        observer = undefined;
    };

    const cancel = () => {
        if (!active) return;
        active = false;
        cleanup();
    };

    const handle: RetryHandle = { cancel };

    const callIfActive = (): boolean => active && callback();

    if (callIfActive()) {
        cancel();
        return handle;
    }

    const deadline = Date.now() + timeoutMs;

    const scheduleNextAttempt = () => {
        if (!active) return;

        const currentDelayMs = delayMs;
        delayMs = Math.min(maxDelayMs, Math.round(delayMs * backoffFactor));

        if (retryIndefinitely) {
            timeoutId = setTimeout(attempt, currentDelayMs);
            return;
        }

        const now = Date.now();

        if (now >= deadline) {
            cancel();
            return;
        }

        const remainingMs = deadline - now;
        const nextDelayMs = Math.min(currentDelayMs, remainingMs);
        timeoutId = setTimeout(attempt, nextDelayMs);
    };

    const attempt = () => {
        if (!active) return;

        if (callIfActive()) {
            cancel();
            return;
        }

        scheduleNextAttempt();
    };

    if (observeMutations && observerRoot) {
        let pending = false;

        observer = new MutationObserver(() => {
            if (pending || !active) return;

            pending = true;

            queueMicrotask(() => {
                if (!active) return;
                pending = false;
                if (callIfActive()) cancel();
            });
        });

        observer.observe(observerRoot, { childList: true, subtree: true });
    }

    scheduleNextAttempt();
    return handle;
};
