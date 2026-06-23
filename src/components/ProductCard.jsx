/**
 * ProductCard.jsx — Product listing card
 *
 * WHAT: card-tech tile with image, category, SKU, price, stock badge, and add-to-cart via CartContext.
 * ROUTE/USED BY: Shop page and BestSellingParts on Home.
 */
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { normalizeImageUrl } from "../utils/imageUrl";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const inStock = product.in_stock !== false && (product.stock ?? 1) > 0;
  const imageSrc = normalizeImageUrl(product.image_url);

  return (
    <div className="card-tech overflow-hidden flex flex-col h-full">
      <Link to={`/shop/${product.id}`} className="block group">
        <div className="aspect-[4/3] bg-slate-100 relative">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-mono-ui">
              No image
            </div>
          )}
          <span className={`badge-stock absolute top-2 left-2 ${inStock ? "badge-in" : "badge-out"}`}>
            {inStock ? "In stock" : "Out"}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p className="tick-label text-brand-600">{product.category}</p>
          <h3 className="font-semibold text-slate-900 mt-1 line-clamp-2 group-hover:text-brand-700">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-mono-ui">SKU: {product.sku}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto flex items-center justify-between gap-2">
        <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
        <button
          type="button"
          disabled={!inStock}
          onClick={() => addItem(product)}
          className="px-3 py-1.5 bg-brand-600 text-white text-sm rounded-tech hover:bg-brand-700 disabled:opacity-40 shrink-0"
        >
          {inStock ? "Add to cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
