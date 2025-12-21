import { getUserAgentUpdateRuleOptions } from '~/dynamic-rules';

export default defineBackground(() => {
    browser.runtime.onInstalled.addListener(() => {
        browser.declarativeNetRequest.updateDynamicRules(getUserAgentUpdateRuleOptions());
    });

    browser.runtime.onMessage.addListener(async (request, sender) => {
        const isIncognito = sender.tab?.incognito ?? false;

        switch (request) {
            case requests.OPEN_SMART_TV: {
                const { openInFullscreen } = await lazyLoadOptions();
                await openSmartTv('', isIncognito, openInFullscreen);
                break;
            }

            case requests.OPEN_SMART_TV_WITH_URI: {
                const uri = getYouTubeRelativeUri(sender.tab?.url);
                const { openInFullscreen } = await lazyLoadOptions();
                await openSmartTv(uri, isIncognito, openInFullscreen);
                break;
            }

            case requests.CLOSE_SMART_TV: {
                const tabId = sender.tab?.id;
                if (tabId != null) browser.tabs.remove(tabId);
                break;
            }
        }
    });

    browser.action.onClicked.addListener(async () => {
        const { openInFullscreen } = await lazyLoadOptions();
        await openSmartTv('', false, openInFullscreen);
    });

    browser.storage.onChanged.addListener(async (_, areaName) => {
        if (areaName !== 'sync') return;
        options = undefined; // force reload
    });
});

let options: Options | undefined;

const lazyLoadOptions = async (): Promise<Options> => (options ??= await getOptions());

const openSmartTv = async (uri = '', incognito = false, fullscreen = true) => {
    await browser.windows.create({
        url: getYouTubeTvUrl(uri),
        state: fullscreen ? 'fullscreen' : undefined,
        focused: true,
        incognito
    });
};
