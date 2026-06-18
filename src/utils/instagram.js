/** Normalize reel/post URL (strip tracking params). */
export function normalizeInstagramUrl(url) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/(reel|p)\/([^/]+)/);
    if (!match) return url;
    return `https://www.instagram.com/${match[1]}/${match[2]}/`;
  } catch {
    return url;
  }
}

/** Build Instagram embed iframe src for reels and posts. */
export function instagramEmbedUrl(url) {
  const normalized = normalizeInstagramUrl(url);
  const match = normalized.match(/instagram\.com\/(reel|p)\/([^/]+)/);
  if (!match) return null;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
}
