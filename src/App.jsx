/**
 * App.jsx — Application router
 *
 * WHAT: Declares React Router routes for the public storefront (nested under Layout) and standalone admin pages.
 * ROUTE/USED BY: Rendered by main.jsx; paths /, /shop, /shop/:productId, /checkout, /service, /wholesale, /admin, /admin/dashboard.
 */
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Service from "./pages/Service";
import Wholesale from "./pages/Wholesale";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:productId" element={<ProductDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="service" element={<Service />} />
        <Route path="wholesale" element={<Wholesale />} />
      </Route>
      <Route path="admin" element={<AdminLogin />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
