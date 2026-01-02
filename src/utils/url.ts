const BASE_URL = 'https://www.youtube.com';

/**
 * Parses a string into a {@link URL} without throwing an error.
 *
 * @param value - Input string.
 * @returns Parsed URL, or `null` when input is missing or invalid.
 */
export function tryParseUrl(value?: string): URL | null {
  if (!value) return null;

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

/**
 * Checks whether a URL is an HTTPS YouTube URL (including subdomains).
 *
 * @param url - Parsed URL.
 */
export function isYouTubeUrl(url: URL): boolean {
  if (url.protocol !== 'https:') return false;
  return url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com');
}

/**
 * Gets a YouTube URL as a relative URI (path + query + hash).
 *
 * @param urlString - Raw URL string.
 * @returns Relative URI for valid YouTube URLs, otherwise an empty string.
 */
export function getYouTubeRelativeUri(urlString?: string): string {
  const url = tryParseUrl(urlString);
  if (!url || !isYouTubeUrl(url)) return '';
  return `${url.pathname}${url.search}${url.hash}`;
}

/**
 * Builds a canonical YouTube TV URL from a relative URI or query string.
 *
 * @param uri - Relative URI, with or without a leading slash, optionally already prefixed with `/tv`.
 * @returns Full `https://www.youtube.com/tv...` URL without a trailing slash.
 */
export function getYouTubeTvUrl(uri = ''): string {
  let trimmedUri = uri.trim();
  const prefixesToTrimSequence = ['/', 'tv', '/'];

  for (const prefix of prefixesToTrimSequence) {
    if (trimmedUri.startsWith(prefix)) trimmedUri = trimmedUri.slice(prefix.length);
  }

  const isQuery = trimmedUri.startsWith('?');
  const tvPath = isQuery ? `/tv${trimmedUri}` : `/tv/${trimmedUri}`;
  const url = new URL(tvPath, BASE_URL).toString();

  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/**
 * Adds or updates the `t` query parameter (timestamp) in a URL.
 *
 * @param urlString - Full URL string.
 * @param currentTimeSeconds - Current time in seconds (will be floored and clamped to `>= 0`).
 * @returns Updated URL, or the original string when parsing fails.
 */
export function getUrlWithTimestamp(urlString: string, currentTimeSeconds: number): string {
  const url = tryParseUrl(urlString);
  if (!url) return urlString;

  const seconds = Number.isFinite(currentTimeSeconds)
    ? Math.max(0, Math.floor(currentTimeSeconds))
    : 0;

  url.searchParams.set('t', seconds.toString());
  return url.toString();
}
