import { useEffect, useState } from "react";
import TourFormModal from "../../components/admin/TourFormModal.jsx";

const API_BASE = "http://localhost:5000/api";

// Helper to attach JWT token
const authHeaders = () => {
  const token = localStorage.getItem("lavera_admin_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function PackagePage() {
  const [tours, setTours] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // 🔹 LOAD TOURS
const loadTours = async () => {
  try {
    const res = await fetch(`${API_BASE}/tours`, {
      headers: authHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("lavera_admin_token");
      window.location.href = "/login";
      return;
    }

    const json = await res.json();

    console.log("TOURS API RESPONSE:", json);

    // ✅ BULLETPROOF EXTRACTION
    let toursArray = [];

    if (Array.isArray(json.data)) {
      toursArray = json.data;
    } else if (Array.isArray(json.data?.rows)) {
      toursArray = json.data.rows;
    } else if (Array.isArray(json.data?.items)) {
      toursArray = json.data.items;
    } else if (Array.isArray(json.data?.tours)) {
      toursArray = json.data.tours;
    }

    setTours(toursArray);

    if (!selectedId && toursArray.length) {
      setSelectedId(toursArray[0].id);
    }
  } catch (err) {
    console.error("LOAD TOURS FAILED:", err);
    setTours([]);
  }
};



  // 🔹 LOAD ON MOUNT
  useEffect(() => {
    loadTours();
  }, []);

  // 🔹 ADD TOUR
  const openAdd = () => {
    setEditingTour(null);
    setModalOpen(true);
  };

  // 🔹 EDIT TOUR
  const openEditSelected = () => {
    const tour = tours.find((t) => t.id === selectedId);
    if (!tour) {
      alert("No tour selected");
      return;
    }
    setEditingTour(tour);
    setModalOpen(true);
  };

  // 🔹 DELETE TOUR
  const deleteSelected = async () => {
    const tour = tours.find((t) => t.id === selectedId);
    if (!tour) {
      alert("No tour selected");
      return;
    }

    if (!window.confirm(`Delete "${tour.name}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/tours/${tour.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem("lavera_admin_token");
        window.location.href = "/login";
        return;
      }

      loadTours();
    } catch (err) {
      console.error(err);
      alert("Error deleting tour");
    }
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(tours) &&
          tours.map((t) => {
            const selected = t.id === selectedId;

            return (
              <div
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`
                  cursor-pointer bg-white rounded-2xl p-5 border shadow-sm
                  transition-all duration-300
                  hover:shadow-lg hover:scale-[1.03] hover:border-green-500
                  ${
                    selected
                      ? "border-green-600 shadow-md scale-[1.02]"
                      : "border-gray-200"
                  }
                `}
              >
                <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                  {t.type}
                </p>

                <h3 className="font-semibold text-lg">{t.name}</h3>
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
                  <p className="font-bold text-lg">
                    ₱ {Number(t.price).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Includes: {t.inclusions || "meals, hotels, ..."}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {t.details}
                </p>
              </div>
            );
          })}

        {tours.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full text-center">
            No tours defined yet.
          </p>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={openAdd}
          className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7] transition"
        >
          + Add
        </button>
        <button
          onClick={openEditSelected}
          className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7] transition"
        >
          Edit
        </button>
        <button
          onClick={deleteSelected}
          className="px-6 py-2 rounded-full bg-[#d3ebd7] text-sm font-medium hover:bg-[#c1dfc7] transition"
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
