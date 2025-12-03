import { useEffect, useState } from "react";

export default function InquiryModal({ open, onClose, tour, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!open) {
      setForm({ name: "", email: "", message: "" });
    }
  }, [open]);

  if (!open || !tour) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, package_id: tour.id });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-[#2b7a3d] mb-1">
          Contact Lavera Bus Tours
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Send us an inquiry about{" "}
          <span className="font-semibold lowercase">{tour.name}</span> and
          we’ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 mt-1 text-sm h-24 resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
