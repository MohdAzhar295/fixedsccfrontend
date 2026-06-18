/**
 * Site header — logo, search, contact, social links, navigation, cart.
 */
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, BRAND_TAGLINE } from "../config";
import { formatDisplayPhone, telHref } from "../utils/phone";
import { IconWhatsApp, IconInstagram, IconPhone, IconSearch } from "./icons";

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const displayPhone = formatDisplayPhone(WHATSAPP_NUMBER);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/shop?search=${encodeURIComponent(q)}` : "/shop");
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
      isActive
        ? "border-brand-600 text-brand-700"
        : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: logo, search, contact */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 py-3 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/brand/logo.jpg"
              alt="Smart Cool Care"
              className="w-12 h-12 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div>
              <span className="font-display font-bold text-lg text-slate-900 leading-tight block group-hover:text-brand-700 transition-colors">
                Smart Cool Care
              </span>
              <span className="tick-label text-brand-600 uppercase">{BRAND_TAGLINE}</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl mx-auto w-full gap-2">
            <div className="relative flex-1">
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search parts — SKU, brand, name…"
                className="w-full pl-9 pr-3 py-2.5 border-2 border-slate-200 rounded-tech text-sm bg-slate-50 focus:outline-none focus:border-brand-600 focus:bg-white focus:ring-1 focus:ring-brand-600"
              />
            </div>
            <button type="submit" className="btn-primary text-sm shrink-0 px-5">
              Search
            </button>
          </form>

          <div className="flex items-center justify-center lg:justify-end gap-3 shrink-0">
            <a
              href={telHref(WHATSAPP_NUMBER)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-brand-700"
              title="Call us"
            >
              <IconPhone className="w-4 h-4" />
              {displayPhone}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-tech bg-[#25D366] text-white hover:bg-[#1fba57] transition-colors"
              title="WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <IconWhatsApp className="w-5 h-5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-tech bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity"
              title="Instagram"
              aria-label="Follow on Instagram"
            >
              <IconInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Row 2: navigation */}
        <div className="flex items-center justify-between h-12">
          <nav className="flex items-center gap-1 overflow-x-auto">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={navClass}>
              Shop
            </NavLink>
            <NavLink to="/service" className={navClass}>
              Service
            </NavLink>
            <NavLink to="/wholesale" className={navClass}>
              Wholesale
            </NavLink>
          </nav>
          <NavLink to="/checkout" className={`${navClass({ isActive: false })} relative ml-2`}>
            Cart
            {count > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-accent-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
