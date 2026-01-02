import agents from './user-agents.json';

type UpdateRuleOptions = Browser.declarativeNetRequest.UpdateRuleOptions;

const YOUTUBE_TV_FILTER = 'youtube.com/tv';
const DEFAULT_USER_AGENT = agents['user-agents'].default;

export const getUserAgentUpdateRuleOptions = (id = 1): UpdateRuleOptions => ({
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
            value: DEFAULT_USER_AGENT
          }
        ]
      },
      condition: {
        resourceTypes: ['main_frame'],
        urlFilter: YOUTUBE_TV_FILTER
      }
    }
  ]
});
