/**
 * Turn page links (Unsplash, etc.) into URLs that work in <img src>.
 */
export function normalizeImageUrl(url) {
  if (!url || typeof url !== "string") return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  // Already a direct image or local file
  if (
    trimmed.startsWith("/") ||
    /^https?:\/\/images\.unsplash\.com\//i.test(trimmed) ||
    /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(trimmed)
  ) {
    return trimmed;
  }

  // Unsplash photo page → download redirect (works in <img>)
  if (/unsplash\.com\/photos\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      const slug = parsed.pathname.split("/photos/")[1]?.replace(/\/$/, "");
      if (!slug) return trimmed;

      const parts = slug.split("-");
      const last = parts[parts.length - 1];
      const photoId =
        parts.length > 1 && last.length >= 6 && /^[A-Za-z0-9_-]+$/.test(last) ? last : slug;

      return `https://unsplash.com/photos/${photoId}/download?w=800&fm=jpg`;
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}
