/**
 * App configuration — API, contact, shop, and social links from Vite env vars.
 */
export const API_URL = (import.meta.env.VITE_API_URL || "https://newcurser.onrender.com").replace(
  /\/$/,
  ""
);

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919718639697";

export const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/smart_cool_care/";

export const INSTAGRAM_HANDLE = "@smart_cool_care";

export const BRAND_TAGLINE = "AC spare parts — genuine and trusted · Est. 2017";

export const GSTIN = import.meta.env.VITE_GSTIN || "07AATPQ7109D1ZG";

export const SHOP_ADDRESS =
  import.meta.env.VITE_SHOP_ADDRESS ||
  "E-83/2, Hamdard Gali, Shaheen Bagh, Jamia Nagar, New Delhi 110025";

export const MAPS_URL =
  import.meta.env.VITE_MAPS_URL ||
  "https://www.google.com/maps/search/?api=1&query=E-83%2F2+Hamdard+Gali+Shaheen+Bagh+New+Delhi+110025";

/** Parse "url|Title" pairs from env. */
function parseVideoList(raw, fallback) {
  if (raw) {
    return raw
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [url, ...titleParts] = entry.split("|");
        const clean = url.trim().split("?")[0];
        const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
        return {
          url: withSlash,
          title: titleParts.join("|").trim() || "Watch on Instagram",
        };
      });
  }
  return fallback;
}

/** Homepage reels (above Shop by Category). */
export const HOME_INSTAGRAM_REELS = parseVideoList(import.meta.env.VITE_HOME_INSTAGRAM_REELS, [
  {
    url: "https://www.instagram.com/reel/DYpB71iyGey/",
    title: "Workshop clip 1",
  },
  {
    url: "https://www.instagram.com/reel/DYji2fMSv8H/",
    title: "Workshop clip 2",
  },
]);

/** Parse "url|Title" pairs from env; falls back to profile placeholders. */
function parseInstagramVideos() {
  return parseVideoList(import.meta.env.VITE_INSTAGRAM_VIDEOS, [
    {
      url: "https://www.instagram.com/reel/DYtiXJ-S2w_/",
      title: "Workshop clip 1",
    },
    {
      url: "https://www.instagram.com/reel/DZZR4IEyh3N/",
      title: "Workshop clip 2",
    },
    {
      url: "https://www.instagram.com/reel/DWDwV54RSaY/",
      title: "Workshop clip 3",
    },
  ]);
}

export const INSTAGRAM_VIDEOS = parseInstagramVideos();
