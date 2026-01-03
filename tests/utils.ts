import { vi } from 'vitest';

export function assertNonNullOrUndefined<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value == null || value === undefined) {
    throw new Error(message);
  }
}

export function useFakeTimersAtEpoch(): void {
  vi.useFakeTimers();
  vi.setSystemTime(0);
}

export function runQueueMicrotaskImmediately(): void {
  vi.stubGlobal('queueMicrotask', (fn: VoidFunction) => fn());
}

export function stubMutationObserver(): { triggerMutation(): void } {
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

export class FakeMutationObserver implements MutationObserver {
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
