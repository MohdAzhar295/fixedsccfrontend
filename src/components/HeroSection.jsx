/**
 * Homepage hero — two-column layout with search, stats, trust chips, storefront photo.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WHATSAPP_NUMBER, GSTIN } from "../config";
import { formatDisplayPhone, telHref } from "../utils/phone";
import { IconSearch } from "./icons";

const TRUST_ITEMS = [
  { label: "Genuine parts", detail: "OEM & compatible" },
  { label: "Pan-India delivery", detail: "Dispatch same day" },
  { label: "Prepaid only", detail: "No cash on delivery" },
  { label: "WhatsApp order", detail: "Retail checkout" },
  { label: "Wholesale", detail: "Bulk for technicians" },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/shop?search=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <section className="bp-grid bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — copy + search */}
          <div className="lg:col-span-7 rise-in">
            <p className="tick-label text-brand-600 mb-3">
              Fig.01 · Thermodynamics · Shaheen Bagh
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.02] tracking-tight mb-4">
              AC spare parts,
              <span className="text-brand-600"> precision delivered.</span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Compressors, PCBs, capacitors, remotes &amp; refrigerant — genuine parts from Smart
              Cool Care. <strong className="text-slate-800">Retail prepaid orders</strong> and{" "}
              <strong className="text-slate-800">wholesale supply</strong> for technicians — checkout
              and confirm payment on{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand-700 font-medium hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>

            <form onSubmit={handleSearch} className="mb-6">
              <p className="tick-label mb-2 text-slate-500">Search catalog</p>
              <div className="flex flex-col sm:flex-row gap-2 p-1 bg-slate-50 border border-slate-200 rounded-tech shadow-sm">
                <div className="relative flex-1">
                  <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by SKU, brand, symptom or part name…"
                    className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-tech text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                  />
                </div>
                <button type="submit" className="btn-primary py-3.5 px-8 text-sm sm:shrink-0">
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/shop" className="btn-primary text-sm">
                Browse parts
              </Link>
              <Link to="/service" className="btn-outline text-sm">
                Book AC service
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="card-tech p-4 min-w-[140px]">
                <p className="tick-label mb-1">SKUs available</p>
                <p className="font-display text-3xl font-bold text-slate-900">500+</p>
              </div>
              <div className="card-tech p-4 min-w-[200px] flex-1 sm:flex-none sm:max-w-xs">
                <p className="tick-label mb-1">GSTIN</p>
                <p className="font-mono-ui text-sm md:text-base font-semibold text-slate-900 tracking-wide break-all">
                  {GSTIN}
                </p>
                <p className="text-xs text-slate-500 mt-1">Registered business · tax invoice available</p>
              </div>
            </div>
          </div>

          {/* Right — storefront photo */}
          <div className="lg:col-span-5 rise-in" style={{ animationDelay: "0.1s" }}>
            <div className="card-tech overflow-hidden bg-slate-900">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800">
                <span className="tick-label text-slate-400">Visit our shop</span>
                <span className="tick-label text-brand-400">Daikin authorized dealer</span>
              </div>
              <div className="relative aspect-[4/3] lg:aspect-[3/4] max-h-[520px]">
                <img
                  src="/images/shop-storefront.jpg"
                  alt="Smart Cool Care storefront at Shaheen Bagh, New Delhi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="font-display font-bold text-lg">Smart Cool Care</p>
                  <p className="text-sm text-slate-200 mt-1">
                    E-83/2, Hamdard Gali · Shaheen Bagh, Jamia Nagar
                  </p>
                  <a
                    href={telHref(WHATSAPP_NUMBER)}
                    className="inline-block mt-2 text-sm font-mono-ui text-brand-200 hover:text-white"
                  >
                    {formatDisplayPhone(WHATSAPP_NUMBER)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust chips — full width below hero grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-8 pt-8 border-t border-slate-200">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="card-tech p-4 text-center lg:text-left">
              <p className="tick-label mb-1 text-brand-600">{item.label}</p>
              <p className="text-xs text-slate-600 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
