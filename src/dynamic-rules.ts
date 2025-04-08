import agents from './user-agents.json';

type UpdateRuleOptions = chrome.declarativeNetRequest.UpdateRuleOptions;
type RuleActionType = chrome.declarativeNetRequest.RuleActionType;
type HeaderOperation = chrome.declarativeNetRequest.HeaderOperation;
type ResourceType = chrome.declarativeNetRequest.ResourceType;

export const getUserAgentUpdateRuleOptions = (id: number = 1): UpdateRuleOptions => ({
    removeRuleIds: [id],
    addRules: [
        {
            id: id,
            priority: 1,
            action: {
                type: 'modifyHeaders' as RuleActionType,
                requestHeaders: [
                    {
                        header: 'user-agent',
                        operation: 'set' as HeaderOperation,
                        value: agents['user-agents']['default']
                    }
                ]
            },
            condition: {
                resourceTypes: ['main_frame' as ResourceType],
                urlFilter: 'youtube.com/tv'
            }
        }
    ]
});
