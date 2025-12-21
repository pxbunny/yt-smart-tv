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

export const emptyOptions: Options = {
    showGuideButton: false,
    showMiniGuideButton: false,
    showPlayerButton: false,
    openInFullscreen: false
};

export type OptionKey = keyof Options;

export const optionKeys = Object.keys(defaultOptions) as OptionKey[];

export const isOptionKey = (value: string): boolean => optionKeys.includes(value as OptionKey);

export const getOptions = async (): Promise<Options> => {
    const stored = await browser.storage.sync.get(optionKeys);
    return { ...defaultOptions, ...(stored as Partial<Options>) };
};

export const setOptions = async (options: Partial<Options>) => {
    await browser.storage.sync.set(options);
};
