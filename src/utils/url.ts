const BASE_URL = 'https://www.youtube.com';

export const tryParseUrl = (value: string | undefined): URL | null => {
    if (!value) return null;

    try {
        return new URL(value);
    } catch {
        return null;
    }
};

export const isYouTubeUrl = (url: URL): boolean => {
    if (url.protocol !== 'https:') return false;
    return url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com');
};

export const getYouTubeRelativeUri = (urlString: string | undefined): string => {
    const url = tryParseUrl(urlString);
    if (!url || !isYouTubeUrl(url)) return '';
    return `${url.pathname}${url.search}${url.hash}`;
};

export const getYouTubeTvUrl = (uri = ''): string => {
    let trimmedUri = uri.trim();
    const prefixesToTrimSequence = ['/', 'tv', '/'];

    for (const prefix of prefixesToTrimSequence) {
        if (trimmedUri.startsWith(prefix)) trimmedUri = trimmedUri.slice(prefix.length);
    }

    const isQuery = trimmedUri.startsWith('?');
    const tvPath = isQuery ? `/tv${trimmedUri}` : `/tv/${trimmedUri}`;
    const url = new URL(tvPath, BASE_URL).toString();

    return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const getUrlWithTimestamp = (urlString: string, currentTimeSeconds: number): string => {
    const url = tryParseUrl(urlString);
    if (!url) return urlString;

    const seconds = Number.isFinite(currentTimeSeconds)
        ? Math.max(0, Math.floor(currentTimeSeconds))
        : 0;

    url.searchParams.set('t', seconds.toString());
    return url.toString();
};
