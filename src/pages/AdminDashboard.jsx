/**
 * Admin dashboard — manage products, orders, leads, and shop category tiles.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminStats,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAdminOrders,
  updateAdminOrder,
  fetchAdminLeads,
  updateAdminLead,
  fetchAdminShopCategories,
  createShopCategory,
  updateShopCategory,
  deleteShopCategory,
} from "../api";
import { normalizeImageUrl } from "../utils/imageUrl";

const TABS = ["Overview", "Products", "Orders", "Leads", "Categories"];

const emptyProduct = {
  sku: "",
  name: "",
  category: "General",
  brand: "",
  price: "",
  stock: "",
  description: "",
  compatibility: "",
  image_url: "",
};

const emptyCategory = {
  name: "",
  slug: "",
  image_url: "",
  visible: true,
  sort_order: 0,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("scc_admin_token");
  const [tab, setTab] = useState("Overview");
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editProductId, setEditProductId] = useState(null);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) navigate("/admin");
  }, [token, navigate]);

  const loadAll = async () => {
    if (!token) return;
    try {
      const [s, p, o, l, c] = await Promise.all([
        fetchAdminStats(token),
        fetchProducts(),
        fetchAdminOrders(token),
        fetchAdminLeads(token),
        fetchAdminShopCategories(token),
      ]);
      setStats(s);
      setProducts(p);
      setOrders(o);
      setLeads(l);
      setCategories(c);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadAll();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("scc_admin_token");
    navigate("/admin");
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setError("");
    const name = productForm.name.trim();
    const sku = productForm.sku.trim();
    if (!name || !sku) {
      setError("Please fill in Product Name and SKU (both required).");
      return;
    }
    const payload = {
      ...productForm,
      name,
      sku,
      price: Number(productForm.price) || 0,
      stock: Number(productForm.stock) || 0,
    };
    try {
      if (editProductId) await updateProduct(token, editProductId, payload);
      else await createProduct(token, payload);
      setProductForm(emptyProduct);
      setEditProductId(null);
      setError("");
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const payload = {
      ...categoryForm,
      sort_order: Number(categoryForm.sort_order) || 0,
      visible: Boolean(categoryForm.visible),
    };
    try {
      if (editCategoryId) await updateShopCategory(token, editCategoryId, payload);
      else await createShopCategory(token, payload);
      setCategoryForm(emptyCategory);
      setEditCategoryId(null);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
              View Store
            </a>
            <button type="button" onClick={logout} className="text-sm text-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setError("");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                tab === t ? "bg-brand-500 text-white" : "bg-white text-gray-700 border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {tab === "Overview" && stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              ["Total Orders", stats.total_orders],
              ["Pending Orders", stats.pending_orders],
              ["Products", stats.products],
              ["Low Stock", stats.low_stock],
              ["New Leads", stats.new_leads],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-4 rounded-xl border">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Products" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <form onSubmit={saveProduct} className="bg-white p-4 rounded-xl border space-y-3">
              <h2 className="font-semibold">{editProductId ? "Edit Product" : "Add Product"}</h2>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={productForm.name}
                  onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="e.g. Run Capacitor 35µF"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  value={productForm.sku}
                  onChange={(e) => setProductForm((p) => ({ ...p, sku: e.target.value }))}
                  required
                  placeholder="e.g. CAP-202"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              {[
                ["category", "Category", "e.g. Capacitors"],
                ["brand", "Brand", "e.g. Voltas"],
                ["price", "Price (₹)", "0"],
                ["stock", "Stock qty", "0"],
                ["description", "Description", ""],
                ["compatibility", "Compatibility", ""],
              ].map(([key, label, placeholder]) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type={key === "price" || key === "stock" ? "number" : "text"}
                    min={key === "price" || key === "stock" ? "0" : undefined}
                    placeholder={placeholder}
                    value={productForm[key]}
                    onChange={(e) => setProductForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="/images/categories/capacitors.jpg or direct image link"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm((p) => ({ ...p, image_url: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use a direct image (.jpg/.png), a local path like{" "}
                  <code className="bg-gray-100 px-1">/images/categories/copper.jpg</code>, or an
                  Unsplash photo page — not Instagram/Google Drive links.
                </p>
                {productForm.image_url && (
                  <img
                    src={normalizeImageUrl(productForm.image_url)}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded border"
                  />
                )}
              </div>
              <button type="submit" className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm">
                {editProductId ? "Update" : "Create"}
              </button>
            </form>
            <div className="space-y-2">
              {products.map((p) => (
                <div key={p.id} className="bg-white p-3 rounded-lg border flex justify-between items-center">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{p.price} · Stock: {p.stock}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-brand-600"
                      onClick={() => {
                        setEditProductId(p.id);
                        setProductForm({
                          sku: p.sku,
                          name: p.name,
                          category: p.category,
                          brand: p.brand,
                          price: String(p.price),
                          stock: String(p.stock),
                          description: p.description,
                          compatibility: p.compatibility,
                          image_url: p.image_url,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() => deleteProduct(token, p.id).then(loadAll)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Orders" && (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-white p-4 rounded-xl border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{o.order_number}</p>
                    <p className="text-sm">
                      {o.customer_name} · {o.phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      {o.payment_method} · ₹{o.total}
                    </p>
                  </div>
                  <select
                    value={o.status}
                    onChange={(e) => updateAdminOrder(token, o.id, { status: e.target.value }).then(loadAll)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Leads" && (
          <div className="space-y-3">
            {leads.map((l) => (
              <div key={l.id} className="bg-white p-4 rounded-xl border flex justify-between">
                <div>
                  <p className="font-semibold">{l.customer_name}</p>
                  <p className="text-sm">{l.phone}</p>
                  <p className="text-sm text-gray-600">{l.problem}</p>
                </div>
                <select
                  value={l.status}
                  onChange={(e) => updateAdminLead(token, l.id, { status: e.target.value }).then(loadAll)}
                  className="border rounded px-2 py-1 text-sm h-fit"
                >
                  {["new", "contacted", "closed"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {tab === "Categories" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <form onSubmit={saveCategory} className="bg-white p-4 rounded-xl border space-y-3">
              <h2 className="font-semibold">
                {editCategoryId ? "Edit Category Tile" : "Add Category Tile"}
              </h2>
              <input
                placeholder="Name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm((c) => ({ ...c, name: e.target.value }))}
                required
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                placeholder="Slug (optional)"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm((c) => ({ ...c, slug: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                placeholder="Image URL"
                value={categoryForm.image_url}
                onChange={(e) => setCategoryForm((c) => ({ ...c, image_url: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Sort order"
                value={categoryForm.sort_order}
                onChange={(e) => setCategoryForm((c) => ({ ...c, sort_order: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={categoryForm.visible}
                  onChange={(e) => setCategoryForm((c) => ({ ...c, visible: e.target.checked }))}
                />
                Visible on homepage
              </label>
              {categoryForm.image_url && (
                <img
                  src={normalizeImageUrl(categoryForm.image_url)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <button type="submit" className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm">
                {editCategoryId ? "Update" : "Create"}
              </button>
            </form>

            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white p-3 rounded-lg border flex gap-3 items-center">
                  {cat.image_url && (
                    <img
                      src={normalizeImageUrl(cat.image_url)}
                      alt={cat.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-xs text-gray-500">
                      Order: {cat.sort_order} · {cat.visible ? "Visible" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-brand-600"
                      onClick={() => {
                        setEditCategoryId(cat.id);
                        setCategoryForm({
                          name: cat.name,
                          slug: cat.slug,
                          image_url: cat.image_url,
                          visible: cat.visible,
                          sort_order: cat.sort_order,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() => deleteShopCategory(token, cat.id).then(loadAll)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
