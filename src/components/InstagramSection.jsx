/**
 * Instagram profile + embedded reel players (official embed.js).
 */
import { useEffect } from "react";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, INSTAGRAM_VIDEOS } from "../config";
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

export default function InstagramSection() {
  useEffect(() => {
    loadInstagramEmbedScript();
    const timer = setTimeout(() => window.instgrm?.Embeds.process(), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="card-tech p-6 md:p-8 h-full flex flex-col overflow-hidden">
      <p className="tick-label mb-2">§ Latest on Instagram</p>
      <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2">
        Fresh from the workshop
      </h2>
      <p className="text-slate-600 text-sm mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 items-start">
        {INSTAGRAM_VIDEOS.map((video, i) => (
          <InstagramReelCard key={`${video.url}-${i}`} video={video} />
        ))}
      </div>

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="btn-outline inline-flex items-center justify-center gap-2 text-sm w-full sm:w-auto mt-auto"
      >
        <IconInstagram className="w-4 h-4" />
        Open Instagram
      </a>
    </div>
  );
}
