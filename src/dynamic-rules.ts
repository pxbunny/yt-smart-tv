import agents from './user-agents.json';

export const getUserAgentUpdateRuleOptions = (
    id = 1
): Browser.declarativeNetRequest.UpdateRuleOptions => ({
    removeRuleIds: [id],
    addRules: [
        {
            id,
            priority: 1,
            action: {
                type: 'modifyHeaders',
                requestHeaders: [
                    {
                        header: 'user-agent',
                        operation: 'set',
                        value: agents['user-agents'].default
                    }
                ]
            },
            condition: {
                resourceTypes: ['main_frame'],
                urlFilter: 'youtube.com/tv'
            }
        }
    ]
});
