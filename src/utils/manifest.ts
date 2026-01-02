export function getExtensionName(): string {
  const { name } = browser.runtime.getManifest();
  return name;
}

export function getExtensionVersion(): string {
  const { version } = browser.runtime.getManifest();
  return version;
}
