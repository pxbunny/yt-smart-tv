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
    return url.hostname.endsWith('.youtube.com');
};

export const getYouTubeRelativeUri = (urlString: string | undefined): string => {
    const url = tryParseUrl(urlString);
    if (!url || !isYouTubeUrl(url)) return '';
    return `${url.pathname}${url.search}${url.hash}`;
};

export const getYouTubeTvUrl = (uri: string): string => {
    const tvPath = uri.startsWith('/') || uri.startsWith('?') ? `/tv${uri}` : `/tv/${uri}`;
    return new URL(tvPath, BASE_URL).toString();
};
