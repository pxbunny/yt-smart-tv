import { describe, expect, it } from 'vitest';

import { getUserAgentUpdateRuleOptions } from '../src/dynamic-rules';
import agents from '../src/user-agents.json';

describe('dynamic-rules', () => {
    it('builds a DNR update options object for the given id', () => {
        const id = 123;
        const options = getUserAgentUpdateRuleOptions(id);

        expect(options.removeRuleIds).toEqual([id]);
        expect(options.addRules).toHaveLength(1);

        const rule = options.addRules?.[0];
        expect(rule?.id).toBe(id);
        expect(rule?.priority).toBe(1);
        expect(rule?.condition?.urlFilter).toBe('youtube.com/tv');
        expect(rule?.condition?.resourceTypes).toEqual(['main_frame']);

        expect(rule?.action?.type).toBe('modifyHeaders');
        expect(rule?.action?.requestHeaders).toContainEqual({
            header: 'user-agent',
            operation: 'set',
            value: agents['user-agents'].default
        });
    });
});
