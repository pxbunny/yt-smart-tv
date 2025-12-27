export const getExtensionName = (): string => {
    const { name } = browser.runtime.getManifest();
    return name;
};

export const getExtensionVersion = (): string => {
    const { version } = browser.runtime.getManifest();
    return version;
};
