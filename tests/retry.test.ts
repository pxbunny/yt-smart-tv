import { afterEach, describe, expect, it, vi } from 'vitest';

import { retryUntil } from '../src/utils/retry';

function useFakeTimersAtEpoch(): void {
  vi.useFakeTimers();
  vi.setSystemTime(0);
}

function runQueueMicrotaskImmediately(): void {
  vi.stubGlobal('queueMicrotask', (fn: VoidFunction) => fn());
}

function stubMutationObserver(): { triggerMutation(): void } {
  let triggerMutation = (): void => {
    throw new Error('Expected MutationObserver to be created');
  };

  class CapturingMutationObserver extends FakeMutationObserver {
    constructor(onMutate: MutationCallback) {
      super(onMutate);
      triggerMutation = () => this.trigger();
    }
  }

  vi.stubGlobal(
    'MutationObserver',
    CapturingMutationObserver as unknown as typeof MutationObserver
  );

  return { triggerMutation: () => triggerMutation() };
}

class FakeMutationObserver implements MutationObserver {
  constructor(private readonly onMutate: MutationCallback) {}

  observe(target: Node, options?: MutationObserverInit): void {
    void target;
    void options;
    return;
  }

  disconnect(): void {
    return;
  }

  takeRecords(): MutationRecord[] {
    return [];
  }

  trigger(): void {
    this.onMutate([], this);
  }
}

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

  it('can be cancelled', () => {
    useFakeTimersAtEpoch();

    const callback = vi.fn(() => false);

    const handle = retryUntil(callback, {
      retryIndefinitely: true,
      observeMutations: false,
      observerRoot: null,
      initialDelayMs: 100,
      maxDelayMs: 100,
      backoffFactor: 1
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);

    handle.cancel();

    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(10_000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('retries with backoff until the callback succeeds', () => {
    useFakeTimersAtEpoch();

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
    useFakeTimersAtEpoch();

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

  it('retries indefinitely when retryIndefinitely is true', () => {
    useFakeTimersAtEpoch();

    const callback = vi.fn(() => false);

    retryUntil(callback, {
      observeMutations: false,
      observerRoot: null,
      retryIndefinitely: true,
      timeoutMs: 250,
      initialDelayMs: 100,
      maxDelayMs: 100,
      backoffFactor: 1
    });

    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1_000);
    expect(callback).toHaveBeenCalledTimes(11);
    expect(vi.getTimerCount()).toBe(1);
  });

  it('cancels the pending timer when it succeeds via MutationObserver in retryIndefinitely mode', () => {
    vi.useFakeTimers();

    runQueueMicrotaskImmediately();
    const { triggerMutation } = stubMutationObserver();

    const callback = vi
      .fn()
      .mockReturnValueOnce(false) // initial call
      .mockReturnValueOnce(true); // on mutation

    retryUntil(callback, {
      retryIndefinitely: true,
      observeMutations: true,
      observerRoot: {} as Node,
      initialDelayMs: 10_000
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);

    triggerMutation();

    expect(callback).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('can succeed via MutationObserver without waiting for the next timer', () => {
    vi.useFakeTimers();

    runQueueMicrotaskImmediately();
    const { triggerMutation } = stubMutationObserver();

    const callback = vi
      .fn()
      .mockReturnValueOnce(false) // initial call
      .mockReturnValueOnce(true); // on mutation

    retryUntil(callback, {
      observeMutations: true,
      observerRoot: {} as Node,
      initialDelayMs: 10_000
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);

    triggerMutation();

    expect(callback).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
  });
});
