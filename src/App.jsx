/**
 * Root app — defines routes for storefront, checkout, service, and admin panel.
 */
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
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
        <Route path="checkout" element={<Checkout />} />
        <Route path="service" element={<Service />} />
        <Route path="wholesale" element={<Wholesale />} />
      </Route>
      <Route path="admin" element={<AdminLogin />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
