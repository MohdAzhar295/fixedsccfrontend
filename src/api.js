/**
 * API client — fetch helpers for storefront and admin endpoints.
 */
import { API_URL } from "./config";

/** Generic JSON fetch wrapper with error handling. */
async function request(path, options = {}) {
  const { headers: extraHeaders, ...rest } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(extraHeaders || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.detail || "Request failed");
  }
  return data;
}

// --- Public API ---

export function fetchProducts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/products${qs ? `?${qs}` : ""}`);
}

export function fetchProductCategories() {
  return request("/api/products/categories");
}

export function fetchShopCategories() {
  return request("/api/shop-categories");
}

export function placeOrder(payload) {
  return request("/api/orders", { method: "POST", body: JSON.stringify(payload) });
}

export function submitLead(payload) {
  return request("/api/leads", { method: "POST", body: JSON.stringify(payload) });
}

// --- Admin API ---

function adminHeaders(token) {
  return { "x-admin-token": token };
}

export function adminLogin(username, password) {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function fetchAdminStats(token) {
  return request("/api/admin/stats", { headers: adminHeaders(token) });
}

export function fetchAdminOrders(token) {
  return request("/api/admin/orders", { headers: adminHeaders(token) });
}

export function updateAdminOrder(token, id, payload) {
  return request(`/api/admin/orders/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function fetchAdminLeads(token) {
  return request("/api/admin/leads", { headers: adminHeaders(token) });
}

export function updateAdminLead(token, id, payload) {
  return request(`/api/admin/leads/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function createProduct(token, payload) {
  return request("/api/products", {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateProduct(token, id, payload) {
  return request(`/api/products/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(token, id) {
  return request(`/api/products/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
}

export function fetchAdminShopCategories(token) {
  return request("/api/admin/shop-categories", { headers: adminHeaders(token) });
}

export function createShopCategory(token, payload) {
  return request("/api/admin/shop-categories", {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function updateShopCategory(token, id, payload) {
  return request(`/api/admin/shop-categories/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
  });
}

export function deleteShopCategory(token, id) {
  return request(`/api/admin/shop-categories/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
}

/** Build a WhatsApp deep-link with a prepaid order message. */
export function buildWhatsAppOrderUrl(number, { customer, items, total, orderNumber }) {
  const lines = [
    "Hello Smart Cool Care, I would like to place a *Prepaid Order*:",
    "",
    orderNumber ? `Order: ${orderNumber}` : "",
    `Name: ${customer.customer_name}`,
    `Phone: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : "",
    `Address: ${customer.address}`,
    customer.city ? `City: ${customer.city}` : "",
    customer.pincode ? `Pincode: ${customer.pincode}` : "",
    "",
    "*Cart Items:*",
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.name} (SKU: ${item.sku || "N/A"}) x${item.quantity} = ₹${item.price * item.quantity}`
    ),
    "",
    `*Total: ₹${total}*`,
    "",
    customer.notes ? `Notes: ${customer.notes}` : "",
    "",
    "Please confirm payment details. Thank you!",
  ].filter(Boolean);

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/** WhatsApp deep-link for wholesale / bulk enquiry. */
export function buildWhatsAppWholesaleUrl(
  number,
  { customer_name = "", phone = "", city = "", business_name = "", parts_list = "" } = {}
) {
  const lines = [
    "Hello Smart Cool Care, I need a *Wholesale / Bulk Parts* quote:",
    "",
    customer_name ? `Name: ${customer_name}` : "",
    phone ? `Phone: ${phone}` : "",
    city ? `City: ${city}` : "",
    business_name ? `Business: ${business_name}` : "",
    "",
    parts_list ? `Parts needed:\n${parts_list}` : "Please share your wholesale price list.",
    "",
    "Prepaid order — please confirm stock and payment details. Thank you!",
  ].filter(Boolean);

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
