/**
 * ProductDetail.jsx — Single product overview page
 *
 * WHAT: Loads one product by id and shows image, pricing, stock, description, and compatibility.
 * ROUTE/USED BY: Route /shop/:productId inside Layout.
 * API/CONNECTS: fetchProduct.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../api";
import { useCart } from "../context/CartContext";
import { normalizeImageUrl } from "../utils/imageUrl";

export default function ProductDetail() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProduct(productId)
      .then(setProduct)
      .catch((err) => setError(err.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h1>
        <p className="text-gray-500 mb-6">{error || "This product may have been removed."}</p>
        <Link to="/shop" className="text-brand-600 hover:underline font-semibold">
          ← Back to shop
        </Link>
      </div>
    );
  }

  const inStock = product.in_stock !== false && (product.stock ?? 0) > 0;
  const imageSrc = normalizeImageUrl(product.image_url);
  const maxQty = Math.max(1, product.stock ?? 1);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 mb-6"
      >
        ← Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="card-tech overflow-hidden">
          <div className="aspect-[4/3] bg-slate-100 relative">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No image
              </div>
            )}
            <span className={`badge-stock absolute top-3 left-3 ${inStock ? "badge-in" : "badge-out"}`}>
              {inStock ? "In stock" : "Out of stock"}
            </span>
          </div>
        </div>

        <div>
          <p className="tick-label text-brand-600">{product.category}</p>
          <h1 className="font-display text-3xl font-bold text-slate-900 mt-2">{product.name}</h1>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-800">SKU:</span>{" "}
              <span className="font-mono-ui">{product.sku}</span>
            </p>
            {product.brand ? (
              <p>
                <span className="font-semibold text-slate-800">Brand:</span> {product.brand}
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-slate-800">Availability:</span>{" "}
              {inStock ? `${product.stock} in stock` : "Currently unavailable"}
            </p>
          </div>

          <p className="mt-6 text-3xl font-bold text-slate-900">₹{product.price}</p>

          {product.description ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Overview</h2>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          ) : null}

          {product.compatibility ? (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Compatibility</h2>
              <p className="text-slate-600 leading-relaxed">{product.compatibility}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {inStock ? (
              <>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  Qty
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {Array.from({ length: Math.min(maxQty, 10) }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-5 py-2.5 bg-brand-600 text-white rounded-tech hover:bg-brand-700 font-semibold"
                >
                  Add to cart
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled
                className="px-5 py-2.5 bg-brand-600 text-white rounded-tech opacity-40 font-semibold"
              >
                Unavailable
              </button>
            )}
            <Link
              to="/checkout"
              className="px-5 py-2.5 border border-brand-600 text-brand-600 rounded-tech hover:bg-brand-50 font-semibold"
            >
              Go to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
