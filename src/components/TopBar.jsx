/**
 * Top info strip — matches old site location / brand line.
 */
import { SHOP_ADDRESS, BRAND_TAGLINE, GSTIN } from "../config";

export default function TopBar() {
  const area = SHOP_ADDRESS.includes("Shaheen Bagh") ? "Shaheen Bagh, New Delhi" : SHOP_ADDRESS;

  return (
    <div className="bg-slate-900 text-slate-300 text-xs font-mono-ui border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <p className="tracking-wider uppercase">
          smartcoolcare.store · Retail &amp; wholesale · {area}
        </p>
        <p className="text-slate-500 shrink-0 uppercase tracking-wider">
          {BRAND_TAGLINE} · GSTIN {GSTIN}
        </p>
      </div>
    </div>
  );
}
