/**
 * Homepage Instagram reels — shown above Shop by Category.
 */
import { useEffect } from "react";
import { HOME_INSTAGRAM_REELS, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";
import { normalizeInstagramUrl } from "../utils/instagram";
import { IconInstagram } from "./icons";

function loadInstagramEmbedScript() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }
  const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
  if (existing) {
    existing.addEventListener("load", () => window.instgrm?.Embeds.process());
    return;
  }
  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  script.onload = () => window.instgrm?.Embeds.process();
  document.body.appendChild(script);
}

function InstagramReelCard({ video }) {
  const pageUrl = normalizeInstagramUrl(video.url);

  return (
    <div className="flex flex-col min-w-0">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={pageUrl}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "2px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: 0,
          maxWidth: "540px",
          minWidth: "280px",
          padding: 0,
          width: "100%",
        }}
      >
        <a href={pageUrl} target="_blank" rel="noreferrer" className="block p-4 text-sm text-slate-500">
          Loading {video.title}…
        </a>
      </blockquote>
    </div>
  );
}

export default function InstagramReelsStrip() {
  useEffect(() => {
    loadInstagramEmbedScript();
    const timer = setTimeout(() => window.instgrm?.Embeds.process(), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!HOME_INSTAGRAM_REELS.length) return null;

  return (
    <section className="py-10 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="tick-label mb-2">§ Latest on Instagram</p>
            <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900">
              Fresh from the workshop
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Follow{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 font-medium hover:underline"
              >
                {INSTAGRAM_HANDLE}
              </a>{" "}
              for new stock, repairs &amp; installation clips.
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex items-center justify-center gap-2 text-sm shrink-0"
          >
            <IconInstagram className="w-4 h-4" />
            Open Instagram
          </a>
        </div>

        <div
          className={`grid gap-4 items-start ${
            HOME_INSTAGRAM_REELS.length === 1
              ? "grid-cols-1 max-w-lg mx-auto"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {HOME_INSTAGRAM_REELS.map((video, i) => (
            <InstagramReelCard key={`${video.url}-${i}`} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
