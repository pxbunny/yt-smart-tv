/**
 * Returns the extension name as declared in the built manifest.
 */
export function getExtensionName(): string {
  const { name } = browser.runtime.getManifest();
  return name;
}

/**
 * Returns the extension version as declared in the built manifest.
 */
export function getExtensionVersion(): string {
  const { version } = browser.runtime.getManifest();
  return version;
}
