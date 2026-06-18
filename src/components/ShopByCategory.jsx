/**
 * Shop by Category — industrial section with API-driven tiles.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchShopCategories } from "../api";
import { normalizeImageUrl } from "../utils/imageUrl";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 skeleton mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square skeleton" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="tick-label mb-2">§ 03 · Catalog</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              Shop by category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 group inline-flex items-center gap-1"
          >
            View all parts
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => {
            const imageSrc = normalizeImageUrl(cat.image_url);
            return (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.slug || cat.name)}`}
              className="card-tech group overflow-hidden rise-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-square bg-slate-100 relative">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-mono-ui p-2 text-center">
                    {cat.name}
                  </div>
                )}
                <span className="absolute top-2 left-2 tick-label text-slate-500 bg-white/90 px-1">
                  § {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="p-3 text-center text-sm font-semibold text-slate-800">{cat.name}</p>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
