import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

function InquiryViewModal({ open, onClose, inquiry }) {
  if (!open || !inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Inquiry Details</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p>
              <span className="font-semibold">Name:</span> {inquiry.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {inquiry.email}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {inquiry.status}
            </p>
            <p className="mt-2 font-semibold">Package:</p>

            <div className="mt-2 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                {inquiry.type || "Historical"}
              </p>
              <h3 className="font-semibold">{inquiry.package_name}</h3>
              <p className="text-sm text-gray-600">
                {inquiry.locations || "Intramuros, rizal park"}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-bold">
                  ₱{" "}
                  {inquiry.price
                    ? Number(inquiry.price).toLocaleString()
                    : "10,000"}
                </p>
                <button className="text-xs border border-gray-300 rounded-full px-3 py-[4px]">
                  View details
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">Message:</p>
            <div className="border border-gray-300 rounded-xl p-3 h-40 overflow-auto text-sm">
              {inquiry.message}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#d3ebd7] hover:bg-[#c1dfc7] text-sm font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InquiryPage() {
  const [inquiries, setInquiries] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const loadInquiries = async () => {
    try {
      const res = await fetch(`${API_BASE}/inquiries`);
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await fetch(`${API_BASE}/inquiries/${id}`, { method: "DELETE" });
      loadInquiries();
    } catch (err) {
      console.error(err);
      alert("Error deleting inquiry");
    }
  };

  const openView = (inq) => {
    setSelectedInquiry(inq);
    setViewOpen(true);
  };

  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Inquiries</h2>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between text-sm"
          >
            <div>
              <p>
                <span className="font-semibold">Name:</span> {inq.name}
              </p>
              <p>
                <span className="font-semibold">Package:</span>{" "}
                {inq.package_name} ₱{" "}
                {inq.price ? Number(inq.price).toLocaleString() : "10,000"}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {inq.email}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Status :</span>{" "}
                {inq.status || "Available"}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => openView(inq)}
                className="px-4 py-1 rounded-full bg-[#d3ebd7] hover:bg-[#c1dfc7] text-xs font-medium"
              >
                view
              </button>
              <button
                onClick={() => deleteInquiry(inq.id)}
                className="px-4 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full">
            No inquiries yet.
          </p>
        )}
      </div>

      <InquiryViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        inquiry={selectedInquiry}
      />
    </div>
  );
}
