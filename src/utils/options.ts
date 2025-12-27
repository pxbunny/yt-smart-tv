export interface UiOptions {
    showGuideButton: boolean;
    showMiniGuideButton: boolean;
    showPlayerButton: boolean;
}

export interface BehaviorOptions {
    openInNewWindow: boolean;
    openInFullscreen: boolean;
}

export type Options = UiOptions & BehaviorOptions;

export class LazyOptions {
    private options: Options | undefined;

    constructor() {
        browser.storage.onChanged.addListener((_, areaName) => {
            if (areaName !== 'sync') return;
            this.options = undefined; // force reload
        });
    }

    async get(): Promise<Options> {
        return (this.options ??= await getOptions());
    }
}

export const defaultOptions: Options = {
    showGuideButton: true,
    showMiniGuideButton: true,
    showPlayerButton: true,
    openInNewWindow: true,
    openInFullscreen: true
};

export const emptyOptions: Options = {
    showGuideButton: false,
    showMiniGuideButton: false,
    showPlayerButton: false,
    openInNewWindow: false,
    openInFullscreen: false
};

export type OptionKey = keyof Options;

export const optionKeys = Object.keys(defaultOptions) as OptionKey[];

export const isOptionKey = (value: string): value is OptionKey =>
    optionKeys.includes(value as OptionKey);

export const getOptions = async (): Promise<Options> => {
    const stored = await browser.storage.sync.get(optionKeys);
    return { ...defaultOptions, ...(stored as Partial<Options>) };
};

export const setOptions = async (options: Partial<Options>) => {
    await browser.storage.sync.set(options);
};
