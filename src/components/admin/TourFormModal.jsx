import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

// Helper to attach JWT
const authHeaders = () => {
  const token = localStorage.getItem("lavera_admin_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function TourFormModal({ open, onClose, initial, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    type: "Historical",
    locations: "",
    price: "",
    duration: "",
    inclusions: "",
    details: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        type: initial.type || "Historical",
        locations: initial.locations || "",
        price: initial.price || "",
        duration: initial.duration || "",
        inclusions: initial.inclusions || "",
        details: initial.details || "",
      });
    } else {
      setForm({
        name: "",
        type: "Historical",
        locations: "",
        price: "",
        duration: "",
        inclusions: "",
        details: "",
      });
    }
  }, [initial, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
    };

    const url = initial
      ? `${API_BASE}/tours/${initial.id}`
      : `${API_BASE}/tours`;

    const method = initial ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      // 🔐 Auto logout if token invalid
      if (res.status === 401) {
        localStorage.removeItem("lavera_admin_token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to save tour");
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving tour");
    }
  };

  const title = initial ? "Edit Tour" : "Add Tour";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="text-xs text-gray-600">Tour name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1"
              >
                <option>Historical</option>
                <option>Educational</option>
                <option>Leisure</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600">Locations</label>
            <input
              name="locations"
              value={form.locations}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Price (PHP)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Inclusions</label>
              <input
                name="inclusions"
                value={form.inclusions}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600">Details</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 mt-1 h-24 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-full border text-sm hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7]"
            >
              {initial ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
