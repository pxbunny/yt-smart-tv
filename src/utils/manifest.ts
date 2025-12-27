export const getExtensionVersion = (): string => {
    const { version } = browser.runtime.getManifest();
    return version;
};
