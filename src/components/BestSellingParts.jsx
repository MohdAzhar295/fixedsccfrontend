/**
 * Best-selling parts grid — loads in-stock products from API.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";

const LIMIT = 8;

function ProductSkeleton() {
  return (
    <div className="card-tech overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 skeleton" />
        <div className="h-5 w-3/4 skeleton" />
        <div className="h-4 w-1/2 skeleton" />
      </div>
    </div>
  );
}

export default function BestSellingParts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ in_stock: "true" })
      .then((data) => setProducts(data.slice(0, LIMIT)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !products.length) return null;

  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="tick-label mb-2">§ 03 · Featured</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              Best-selling parts
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

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 rise-in">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
