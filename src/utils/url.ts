const BASE_URL = 'https://www.youtube.com';

export function tryParseUrl(value?: string): URL | null {
    if (!value) return null;

    try {
        return new URL(value);
    } catch {
        return null;
    }
}

export function isYouTubeUrl(url: URL): boolean {
    if (url.protocol !== 'https:') return false;
    return url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com');
}

export function getYouTubeRelativeUri(urlString?: string): string {
    const url = tryParseUrl(urlString);
    if (!url || !isYouTubeUrl(url)) return '';
    return `${url.pathname}${url.search}${url.hash}`;
}

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

export function getUrlWithTimestamp(urlString: string, currentTimeSeconds: number): string {
    const url = tryParseUrl(urlString);
    if (!url) return urlString;

    const seconds = Number.isFinite(currentTimeSeconds)
        ? Math.max(0, Math.floor(currentTimeSeconds))
        : 0;

    url.searchParams.set('t', seconds.toString());
    return url.toString();
}
