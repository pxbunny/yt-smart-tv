import { describe, expect, it } from 'vitest';

import {
  getUrlWithTimestamp,
  getYouTubeRelativeUri,
  getYouTubeTvUrl,
  isYouTubeUrl,
  tryParseUrl
} from '../src/utils/url';

describe('tryParseUrl', () => {
  it('returns null for missing input', () => {
    expect(tryParseUrl(undefined)).toBeNull();
    expect(tryParseUrl('')).toBeNull();
  });

  it('returns null for invalid URL', () => {
    expect(tryParseUrl('not-a-url')).toBeNull();
  });

  it('parses valid URL', () => {
    const url = tryParseUrl('https://www.youtube.com/watch?v=abc');
    expect(url).toBeInstanceOf(URL);
    expect(url?.hostname).toBe('www.youtube.com');
  });
});

describe('isYouTubeUrl', () => {
  it('accepts https://youtube.com and subdomains', () => {
    const cases = [
      'https://youtube.com/watch?v=1',
      'https://www.youtube.com/watch?v=1',
      'https://m.youtube.com/watch?v=1'
    ];

    for (const url of cases) {
      expect(isYouTubeUrl(new URL(url))).toBe(true);
    }
  });

  it('rejects non-https or non-youtube hosts', () => {
    const cases = [
      'http://www.youtube.com/watch?v=1',
      'https://example.com',
      'https://evil.youtube.com.evil.com'
    ];

    for (const url of cases) {
      expect(isYouTubeUrl(new URL(url))).toBe(false);
    }
  });
});

describe('getYouTubeRelativeUri', () => {
  it('returns relative uri for YouTube URLs', () => {
    expect(getYouTubeRelativeUri('https://www.youtube.com/watch?v=abc#t=10')).toBe(
      '/watch?v=abc#t=10'
    );
  });

  it('returns empty string for non-YouTube URLs', () => {
    expect(getYouTubeRelativeUri('https://example.com/watch?v=abc')).toBe('');
  });

  it('returns empty string for invalid URL', () => {
    expect(getYouTubeRelativeUri('not-a-url')).toBe('');
  });
});

describe('getYouTubeTvUrl', () => {
  const cases: [uri: string, expected: string][] = [
    ['', 'https://www.youtube.com/tv'],
    ['   ', 'https://www.youtube.com/tv'],
    ['/', 'https://www.youtube.com/tv'],
    ['/watch?v=abc', 'https://www.youtube.com/tv/watch?v=abc'],
    ['watch?v=abc', 'https://www.youtube.com/tv/watch?v=abc'],
    ['?v=abc', 'https://www.youtube.com/tv?v=abc'],
    ['/tv/watch?v=abc', 'https://www.youtube.com/tv/watch?v=abc'],
    ['tv/watch?v=abc', 'https://www.youtube.com/tv/watch?v=abc']
  ];

  for (const [uri, expected] of cases) {
    it(`builds a TV URL for "${uri}"`, () => {
      expect(getYouTubeTvUrl(uri)).toBe(expected);
    });
  }
});

describe('getUrlWithTimestamp', () => {
  it('sets the t param to floored seconds', () => {
    expect(getUrlWithTimestamp('https://www.youtube.com/watch?v=abc', 10.9)).toBe(
      'https://www.youtube.com/watch?v=abc&t=10'
    );
  });

  it('clamps negative and invalid values to 0', () => {
    expect(getUrlWithTimestamp('https://www.youtube.com/watch?v=abc', -1)).toBe(
      'https://www.youtube.com/watch?v=abc&t=0'
    );
    expect(getUrlWithTimestamp('https://www.youtube.com/watch?v=abc', Number.NaN)).toBe(
      'https://www.youtube.com/watch?v=abc&t=0'
    );
  });

  it('overwrites existing t param and preserves other parts', () => {
    expect(getUrlWithTimestamp('https://www.youtube.com/watch?v=abc&t=3#foo', 7)).toBe(
      'https://www.youtube.com/watch?v=abc&t=7#foo'
    );
  });

  it('returns the input string if urlString is invalid', () => {
    expect(getUrlWithTimestamp('not-a-url', 10)).toBe('not-a-url');
  });
});
