import agents from './user-agents.json';

type UpdateRuleOptions = Browser.declarativeNetRequest.UpdateRuleOptions;

const YOUTUBE_TV_FILTER = 'youtube.com/tv';
const DEFAULT_USER_AGENT = agents['user-agents'].default;

/**
 * Creates a Declarative Net Request update payload that forces a custom user agent for `youtube.com/tv`.
 *
 * @param id - Dynamic rule ID (will be removed and re-added).
 * @returns DNR update options for `browser.declarativeNetRequest.updateDynamicRules`.
 */
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
