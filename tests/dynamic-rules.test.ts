import { describe, expect, it } from 'vitest';

import { getUserAgentUpdateRuleOptions } from '../src/dynamic-rules';
import agents from '../src/user-agents.json';

function assertNonNullOrUndefined<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value == null || value === undefined) {
    throw new Error(message);
  }
}

describe('dynamic-rules', () => {
  it('builds a DNR update options object for the given id', () => {
    const id = 123;
    const options = getUserAgentUpdateRuleOptions(id);
    const userAgent = agents['user-agents'].default;

    expect(options.removeRuleIds).toEqual([id]);

    assertNonNullOrUndefined(options.addRules, 'Expected addRules to be present');
    expect(options.addRules).toHaveLength(1);

    const [rule] = options.addRules;
    expect(rule).toMatchObject({
      id,
      priority: 1,
      condition: {
        urlFilter: 'youtube.com/tv',
        resourceTypes: ['main_frame']
      },
      action: {
        type: 'modifyHeaders'
      }
    });

    assertNonNullOrUndefined(rule.action, 'Expected rule.action to be present');
    assertNonNullOrUndefined(
      rule.action.requestHeaders,
      'Expected rule.action.requestHeaders to be present'
    );

    expect(rule.action.requestHeaders).toContainEqual({
      header: 'user-agent',
      operation: 'set',
      value: userAgent
    });
  });
});
