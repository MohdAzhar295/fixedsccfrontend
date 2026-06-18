/**
 * Product card — card-tech styling with stock badge and add-to-cart.
 */
import { useCart } from "../context/CartContext";
import { normalizeImageUrl } from "../utils/imageUrl";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const inStock = product.in_stock !== false && (product.stock ?? 1) > 0;
  const imageSrc = normalizeImageUrl(product.image_url);

  return (
    <div className="card-tech overflow-hidden flex flex-col h-full">
      <div className="aspect-[4/3] bg-slate-100 relative">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover"
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
        <h3 className="font-semibold text-slate-900 mt-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-1 font-mono-ui">SKU: {product.sku}</p>
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
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
    </div>
  );
}
