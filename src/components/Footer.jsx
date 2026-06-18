/**
 * Site footer — old-style industrial layout with contact, shop, and links.
 */
import { Link } from "react-router-dom";
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  SHOP_ADDRESS,
  MAPS_URL,
  BRAND_TAGLINE,
  GSTIN,
} from "../config";
import { formatDisplayPhone, telHref } from "../utils/phone";
import { IconWhatsApp, IconInstagram } from "./icons";

export default function Footer() {
  const displayPhone = formatDisplayPhone(WHATSAPP_NUMBER);

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/brand/logo.jpg"
                alt=""
                className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700"
              />
              <div>
                <p className="font-display font-bold text-white">Smart Cool Care</p>
                <p className="tick-label text-slate-500 uppercase">{BRAND_TAGLINE}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Genuine AC spare parts — pan-India delivery, expert support, walk-in shop in Shaheen
              Bagh.
            </p>
            <p className="text-xs text-slate-500 font-mono-ui mt-3">GSTIN: {GSTIN}</p>
          </div>

          <div>
            <p className="tick-label text-slate-500 mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={telHref(WHATSAPP_NUMBER)} className="hover:text-white transition-colors">
                  {displayPhone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <IconWhatsApp className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <IconInstagram className="w-4 h-4" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="tick-label text-slate-500 mb-4">Visit us</p>
            <p className="text-sm leading-relaxed text-slate-400 mb-3">{SHOP_ADDRESS}</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand-100 hover:text-white underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>

          <div>
            <p className="tick-label text-slate-500 mb-4">Quick links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop parts
                </Link>
              </li>
              <li>
                <Link to="/service" className="hover:text-white transition-colors">
                  AC service
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  Cart / checkout
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Admin login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500 font-mono-ui">
          <span>© {new Date().getFullYear()} Smart Cool Care · GSTIN {GSTIN}</span>
          <span>smartcoolcare.store</span>
        </div>
      </div>
    </footer>
  );
}
