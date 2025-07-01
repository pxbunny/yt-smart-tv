import agents from './user-agents.json';
import DNR = chrome.declarativeNetRequest;

export const getUserAgentUpdateRuleOptions = (id = 1): DNR.UpdateRuleOptions => ({
    removeRuleIds: [id],
    addRules: [
        {
            id: id,
            priority: 1,
            action: {
                type: 'modifyHeaders' as DNR.RuleActionType,
                requestHeaders: [
                    {
                        header: 'user-agent',
                        operation: 'set' as DNR.HeaderOperation,
                        value: agents['user-agents']['default']
                    }
                ]
            },
            condition: {
                resourceTypes: ['main_frame' as DNR.ResourceType],
                urlFilter: 'youtube.com/tv'
            }
        }
    ]
});
