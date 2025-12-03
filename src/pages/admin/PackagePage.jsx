import { useEffect, useState } from "react";
import TourFormModal from "../../components/admin/TourFormModal.jsx";

const API_BASE = "http://localhost:5000/api";

export default function PackagePage() {
  const [tours, setTours] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const loadTours = async () => {
    try {
      const res = await fetch(`${API_BASE}/tours`);
      const data = await res.json();
      setTours(data);
      if (!selectedId && data.length) setSelectedId(data[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const openAdd = () => {
    setEditingTour(null);
    setModalOpen(true);
  };

  const openEditSelected = () => {
    const tour = tours.find((t) => t.id === selectedId);
    if (!tour) return alert("No tour selected");
    setEditingTour(tour);
    setModalOpen(true);
  };

  const deleteSelected = async () => {
    const tour = tours.find((t) => t.id === selectedId);
    if (!tour) return alert("No tour selected");
    if (!window.confirm(`Delete "${tour.name}"?`)) return;
    try {
      await fetch(`${API_BASE}/tours/${tour.id}`, { method: "DELETE" });
      loadTours();
    } catch (err) {
      console.error(err);
      alert("Error deleting tour");
    }
  };

  return (
    <div>
    

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => {
          const selected = t.id === selectedId;
          return (
            <button
              key={t.id}
              type="button"
              className={`text-left bg-white rounded-2xl shadow-sm border p-4 flex flex-col justify-between ${
                selected ? "border-[#2b7a3d] border-2" : "border-gray-200"
              }`}
              onClick={() => setSelectedId(t.id)}
            >
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                  {t.type}
                </p>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-600">{t.locations}</p>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] px-3 py-[3px] rounded-full bg-[#d3ebd7] text-[#2b7a3d]">
                    {t.type}
                  </span>
                  <span className="text-[11px] px-3 py-[3px] rounded-full bg-gray-100 text-gray-700">
                    {t.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="font-bold">
                    ₱ {Number(t.price).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Includes: {t.inclusions || "meals, hotels, ..."}
                  </p>
                </div>

                <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                  {t.details}
                </p>
              </div>
            </button>
          );
        })}
        {tours.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full">
            No tours defined yet.
          </p>
        )}
      </div>

      {/* Bottom buttons similar to your mockup */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={openAdd}
          className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7]"
        >
          + Add
        </button>
        <button
          onClick={openEditSelected}
          className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7]"
        >
          Edit
        </button>
        <button
          onClick={deleteSelected}
          className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7]"
        >
          Delete
        </button>
      </div>

      <TourFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editingTour}
        onSaved={loadTours}
      />
    </div>
  );
}
