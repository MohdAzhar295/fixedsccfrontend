/**
 * Shop page — product listing with search and category filters.
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchProductCategories } from "../api";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    fetchProductCategories().then((data) => setCategories(data.categories || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    fetchProducts(params)
      .then((data) => {
        if (!category || category === "all") return setProducts(data);
        const q = category.toLowerCase();
        setProducts(
          data.filter(
            (p) =>
              p.category?.toLowerCase() === q ||
              p.category?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === q
          )
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (search) next.set("search", search);
    else next.delete("search");
    setSearchParams(next);
  };

  const handleCategory = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shop Parts</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, brand..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />
          <button type="submit" className="px-4 py-2 bg-brand-500 text-white rounded-lg">
            Search
          </button>
        </form>
        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
