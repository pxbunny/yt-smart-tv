export interface Options {
    showGuideButton: boolean;
    showMiniGuideButton: boolean;
    showPlayerButton: boolean;
    openInFullscreen: boolean;
}

export const defaultOptions: Options = {
    showGuideButton: true,
    showMiniGuideButton: true,
    showPlayerButton: true,
    openInFullscreen: true
};

export type OptionKey = keyof Options;

export const getOptions = async (): Promise<Options> => {
    const options = await browser.storage.sync.get<Options>();
    return { ...defaultOptions, ...options };
};

export const setOptions = async (options: Partial<Options>) => {
    await browser.storage.sync.set(options);
};
