/**
 * Checkout page — prepaid orders only; saves order then opens WhatsApp with cart details.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder, buildWhatsAppOrderUrl } from "../api";
import { WHATSAPP_NUMBER } from "../config";

const emptyForm = {
  customer_name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  notes: "",
};

export default function Checkout() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const order = await placeOrder({
        ...form,
        items,
        payment_method: "Prepaid",
      });

      const whatsappUrl = buildWhatsAppOrderUrl(WHATSAPP_NUMBER, {
        customer: form,
        items,
        total,
        orderNumber: order.order_number,
      });

      window.open(whatsappUrl, "_blank");
      clearCart();
      setForm(emptyForm);
      setSuccess(`Order ${order.order_number} saved. Complete payment via WhatsApp.`);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!items.length && !success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/shop" className="text-brand-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Cart items */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Cart Items</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg border">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border rounded"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold mt-4">Total: ₹{total}</p>
        </div>

        {/* Customer form — prepaid only */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border space-y-4">
          <h2 className="font-semibold text-lg">Delivery Details</h2>

          <div className="p-3 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-800">
            Payment: <strong>Prepaid Order</strong> — after placing your order you will be redirected
            to WhatsApp to confirm payment and complete your purchase.
          </div>

          {[
            ["customer_name", "Full Name", "text", true],
            ["phone", "Phone", "tel", true],
            ["email", "Email", "email", false],
            ["address", "Address", "text", true],
            ["city", "City", "text", false],
            ["pincode", "Pincode", "text", false],
          ].map(([name, label, type, required]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                required={required}
                value={form[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Prepaid Order & Open WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
