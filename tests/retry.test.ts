import { afterEach, describe, expect, it, vi } from 'vitest';

import { retryUntil } from '../src/retry';

describe('retryUntil', () => {
    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('calls the callback immediately and stops when it succeeds', () => {
        vi.useFakeTimers();

        const callback = vi.fn(() => true);
        retryUntil(callback, { observeMutations: false, observerRoot: null });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(vi.getTimerCount()).toBe(0);
    });

    it('retries with backoff until the callback succeeds', () => {
        vi.useFakeTimers();
        vi.setSystemTime(0);

        const callback = vi
            .fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        retryUntil(callback, {
            observeMutations: false,
            observerRoot: null,
            timeoutMs: 10_000,
            initialDelayMs: 100,
            maxDelayMs: 1_000,
            backoffFactor: 2
        });

        expect(callback).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledTimes(2);

        vi.advanceTimersByTime(200);
        expect(callback).toHaveBeenCalledTimes(3);

        vi.advanceTimersByTime(400);
        expect(callback).toHaveBeenCalledTimes(4);

        expect(vi.getTimerCount()).toBe(0);
    });

    it('stops retrying after timeout', () => {
        vi.useFakeTimers();
        vi.setSystemTime(0);

        const callback = vi.fn(() => false);
        retryUntil(callback, {
            observeMutations: false,
            observerRoot: null,
            timeoutMs: 250,
            initialDelayMs: 100,
            maxDelayMs: 100,
            backoffFactor: 1
        });

        expect(callback).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledTimes(2);

        vi.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledTimes(3);

        vi.advanceTimersByTime(50);
        expect(callback).toHaveBeenCalledTimes(4);

        vi.advanceTimersByTime(1_000);
        expect(callback).toHaveBeenCalledTimes(4);
        expect(vi.getTimerCount()).toBe(0);
    });

    it('can succeed via MutationObserver without waiting for the next timer', () => {
        vi.useFakeTimers();

        vi.stubGlobal('queueMicrotask', (fn: VoidFunction) => fn());

        let lastObserver: MutationObserver | undefined;

        class FakeMutationObserver {
            constructor(private readonly onMutate: MutationCallback) {}

            observe() {
                return;
            }

            disconnect() {
                return;
            }

            trigger() {
                this.onMutate([], this as unknown as MutationObserver);
            }
        }

        vi.stubGlobal(
            'MutationObserver',
            class extends FakeMutationObserver {
                constructor(onMutate: MutationCallback) {
                    super(onMutate);
                    lastObserver = this as unknown as MutationObserver;
                }
            } as unknown as typeof MutationObserver
        );

        const callback = vi
            .fn()
            .mockReturnValueOnce(false) // initial call
            .mockReturnValueOnce(true); // on mutation

        retryUntil(callback, {
            observeMutations: true,
            observerRoot: {} as unknown as Node,
            initialDelayMs: 10_000
        });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(vi.getTimerCount()).toBe(1);

        (lastObserver as unknown as FakeMutationObserver).trigger();

        expect(callback).toHaveBeenCalledTimes(2);
        expect(vi.getTimerCount()).toBe(0);
    });
});
