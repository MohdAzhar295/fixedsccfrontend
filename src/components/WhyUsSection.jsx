/**
 * Three-step ordering flow — condensed from old homepage.
 */
import { Link } from "react-router-dom";

const STEPS = [
  { n: "01", title: "Search", text: "By SKU, brand or symptom" },
  { n: "02", title: "Add to cart", text: "Pick the parts you need" },
  { n: "03", title: "Prepaid on WhatsApp", text: "Place order & confirm payment on WhatsApp" },
];

export default function WhyUsSection() {
  return (
    <section className="py-14 border-y border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="tick-label mb-2">§ 04 · Why Smart Cool Care</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Technician-trusted since day one.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We supply the same parts AC repair professionals use every day — inspected, labelled
              and dispatched the same day. Orders are <strong>prepaid only</strong>, completed via{" "}
              <strong>WhatsApp</strong> after checkout.
            </p>
            <p className="tick-label text-slate-500">Verified by · Local AC Technicians Network</p>
          </div>
          <div className="space-y-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="card-tech flex items-start gap-4 p-4 hover:border-brand-600 transition-colors"
              >
                <span className="font-mono-ui text-brand-600 font-bold text-lg shrink-0">
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
            <Link to="/shop" className="btn-outline inline-block text-sm mt-2">
              Start shopping →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
