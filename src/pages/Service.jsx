/**
 * Service enquiry page — AC repair / maintenance lead form.
 */
import { useState } from "react";
import { submitLead } from "../api";

export default function Service() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    city: "",
    ac_brand: "",
    problem: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await submitLead(form);
      setMessage("Request submitted! We will contact you soon.");
      setForm({ customer_name: "", phone: "", city: "", ac_brand: "", problem: "" });
    } catch (err) {
      setMessage(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AC Service Request</h1>
      <p className="text-gray-600 mb-8">Describe your AC problem and we will get back to you.</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border space-y-4">
        {["customer_name", "phone", "city", "ac_brand"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize mb-1">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              required={field === "customer_name" || field === "phone"}
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-1">Problem Description</label>
          <textarea
            name="problem"
            required
            rows={4}
            value={form.problem}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes("submitted") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
