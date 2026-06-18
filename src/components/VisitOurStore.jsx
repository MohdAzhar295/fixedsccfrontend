/**
 * Visit our physical shop — address and directions.
 */
import { SHOP_ADDRESS, MAPS_URL } from "../config";

export default function VisitOurStore() {
  return (
    <div className="card-tech p-6 md:p-8 h-full flex flex-col">
      <p className="tick-label mb-2">§ Visit our shop</p>
      <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-3">
        Walk in, browse parts in person
      </h2>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{SHOP_ADDRESS}</p>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noreferrer"
        className="btn-primary inline-block text-center text-sm w-full sm:w-auto"
      >
        Get directions
      </a>
    </div>
  );
}
