/**
 * Homepage wholesale CTA — bulk supply for technicians & dealers.
 */
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER } from "../config";
import { buildWhatsAppWholesaleUrl } from "../api";

const BULK_ITEMS = [
  "Compressors & capacitors",
  "Copper pipe & installation kits",
  "Refrigerant & remotes",
  "PCB boards & motors",
];

export default function WholesaleSection() {
  const whatsappUrl = buildWhatsAppWholesaleUrl(WHATSAPP_NUMBER);

  return (
    <section className="py-14 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="tick-label text-brand-300 mb-2">§ Wholesale</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Bulk parts for technicians &amp; dealers
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Smart Cool Care supplies wholesale AC spare parts across Delhi-NCR and pan-India.
              Prepaid orders on WhatsApp — GST invoice available for registered businesses.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-8">
              {BULK_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-brand-400">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm bg-[#25D366] hover:bg-[#1fba57] border-transparent"
              >
                WhatsApp wholesale enquiry
              </a>
              <Link to="/wholesale" className="btn-outline text-sm border-slate-600 text-white hover:border-brand-400">
                Request bulk quote →
              </Link>
            </div>
          </div>
          <div className="card-tech bg-slate-800 border-slate-700 p-6 md:p-8">
            <p className="tick-label text-slate-400 mb-4">How wholesale works</p>
            <ol className="space-y-4">
              {[
                ["01", "Send your part list", "SKU, brand, or quantity needed"],
                ["02", "Get prepaid quote", "We confirm stock & price on WhatsApp"],
                ["03", "Pay & dispatch", "Same-day dispatch for urgent jobs"],
              ].map(([n, title, text]) => (
                <li key={n} className="flex gap-4">
                  <span className="font-mono-ui text-brand-400 font-bold">{n}</span>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-sm text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
