/**
 * Wholesale enquiry page — bulk quote request via form or WhatsApp.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { submitLead, buildWhatsAppWholesaleUrl } from "../api";
import { WHATSAPP_NUMBER } from "../config";
import { IconWhatsApp } from "../components/icons";

export default function Wholesale() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    city: "",
    business_name: "",
    parts_list: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const problem = [
        "Wholesale / bulk parts enquiry",
        form.business_name ? `Business: ${form.business_name}` : "",
        "",
        "Parts needed:",
        form.parts_list,
      ]
        .filter(Boolean)
        .join("\n");

      await submitLead({
        customer_name: form.customer_name,
        phone: form.phone,
        city: form.city,
        ac_brand: form.business_name || "Wholesale",
        problem,
      });
      setMessage("Request submitted! We will send your wholesale quote on WhatsApp.");
      setForm({
        customer_name: "",
        phone: "",
        city: "",
        business_name: "",
        parts_list: "",
      });
    } catch (err) {
      setMessage(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = buildWhatsAppWholesaleUrl(WHATSAPP_NUMBER, form);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="tick-label text-brand-600 mb-2">Wholesale</p>
      <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Bulk parts &amp; dealer supply</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        For technicians, AC shops and dealers — compressors, capacitors, copper, refrigerant and
        more. <strong>Prepaid only.</strong> Share your list for a quote on WhatsApp.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 mb-8 px-5 py-3 bg-[#25D366] text-white font-semibold rounded-tech hover:bg-[#1fba57] transition-colors"
      >
        <IconWhatsApp className="w-5 h-5" />
        Message us on WhatsApp
      </a>

      <form onSubmit={handleSubmit} className="card-tech p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Or send a bulk quote request</h2>
        {[
          ["customer_name", "Your name", true],
          ["phone", "Phone / WhatsApp", true],
          ["city", "City", false],
          ["business_name", "Shop / business name (optional)", false],
        ].map(([name, label, required]) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              name={name}
              required={required}
              value={form[name]}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-1">Parts list &amp; quantities</label>
          <textarea
            name="parts_list"
            required
            rows={5}
            placeholder="e.g. 10× Run Capacitor 35µF, 5× R32 refrigerant, 20m copper pipe…"
            value={form.parts_list}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes("submitted") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 btn-primary disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Request wholesale quote"}
        </button>
      </form>

      <p className="text-sm text-slate-500 mt-6">
        <Link to="/shop" className="text-brand-600 hover:underline">
          ← Back to retail shop
        </Link>
      </p>
    </div>
  );
}
