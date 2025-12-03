import { useEffect, useState } from "react";
import TourCard from "../components/TourCard.jsx";
import InquiryModal from "../components/InquiryModal.jsx";

const API_BASE = "http://localhost:5000/api";

// Helper: convert "10h" or "7h 45m" -> minutes
function durationToMinutes(str = "") {
  const h = /(\d+)\s*h/i.exec(str)?.[1];
  const m = /(\d+)\s*m/i.exec(str)?.[1];
  return (h ? parseInt(h, 10) * 60 : 0) + (m ? parseInt(m, 10) : 0);
}

function DetailsModal({ open, onClose, tour }) {
  if (!open || !tour) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative shadow-lg">

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left */}
          <div>
            <h2 className="text-xl font-extrabold tracking-widest text-[#2b7a3d] mb-2 uppercase">
              {tour.name}
            </h2>

            <p className="text-sm mb-2">
              <span className="font-semibold">Locations :</span>{" "}
              {tour.locations}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Duration:</span> {tour.duration}
              &nbsp;&nbsp;&nbsp;
              <span className="font-semibold">Price:</span> ₱{" "}
              {Number(tour.price).toLocaleString()}
            </p>

            <p className="text-sm mb-1 font-semibold">Inclusions :</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
              {(tour.inclusions || "")
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean)
                .map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              {!tour.inclusions && (
                <>
                  <li>Entrance fees</li>
                  <li>Lunch</li>
                </>
              )}
            </ul>

            <p className="text-sm text-gray-700 leading-relaxed">
              {tour.details ||
                "Exploring it with a knowledgeable guide transforms a simple visit into an immersive journey."}
            </p>
          </div>

          {/* Right */}
          <div className="border-l border-gray-200 pl-6 flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4">Contact to book</h3>
            <p className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              info@laveratours.example
            </p>
            <p className="text-sm mb-6">
              <span className="font-semibold">Phone:</span> +63 912 3456 789
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#d3ebd7] hover:bg-[#c1dfc7] text-sm font-medium self-start"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // NEW: filter + sort state
  const [typeFilter, setTypeFilter] = useState("All types");
  const [sortBy, setSortBy] = useState("recommendation"); // recommendation | price-asc | price-desc | duration-asc | name-asc

  const [selectedTour, setSelectedTour] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [detailsTour, setDetailsTour] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const loadTours = async () => {
    try {
      const res = await fetch(`${API_BASE}/tours`);
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  // Re-apply search + filter + sort whenever dependencies change
  useEffect(() => {
    let out = [...tours];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (t) =>
          t.name?.toLowerCase().includes(q) ||
          t.locations?.toLowerCase().includes(q)
      );
    }

    // type filter
    if (typeFilter !== "All types") {
      out = out.filter((t) => (t.type || "").toLowerCase() === typeFilter.toLowerCase());
    }

    // sort
    switch (sortBy) {
      case "price-asc":
        out.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        out.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "duration-asc":
        out.sort(
          (a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration)
        );
        break;
      case "name-asc":
        out.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "recommendation":
      default:
        // leave server order as-is
        break;
    }

    setFiltered(out);
  }, [tours, search, typeFilter, sortBy]);

  // modal handlers
  const handleInquire = (tour) => {
    setSelectedTour(tour);
    setInquiryOpen(true);
  };

  const handleSubmitInquiry = async (payload) => {
    try {
      await fetch(`${API_BASE}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Inquiry sent! We’ll get back to you.");
      setInquiryOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error sending inquiry");
    }
  };

  const openDetails = (tour) => {
    setDetailsTour(tour);
    setDetailsOpen(true);
  };

  return (
    <main className="px-6">
      {/* Filters & search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex flex-wrap items-center gap-3">
          {/* TYPE FILTER (select styled like your pill) */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-[7px] text-xs pr-8 shadow-sm"
            >
              <option>All types</option>
              <option>Historical</option>
              <option>Educational</option>
              <option>Leisure</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>

          {/* SORT (select styled like your pill) */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-[7px] text-xs pr-8 shadow-sm"
            >
              <option value="recommendation">Sort: recommendation</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="duration-asc">Duration: short → long</option>
              <option value="name-asc">Name: A → Z</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>
        </div>

        <div className="flex-1 md:max-w-md">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            <span className="text-gray-400 mr-2">🔎︎</span>
            <input
              type="text"
              placeholder="Search tours or destination"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onInquire={handleInquire}
            onViewDetails={openDetails}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full">No tours found.</p>
        )}
      </div>

      {/* Modals */}
      <InquiryModal
        open={inquiryOpen}
        tour={selectedTour}
        onClose={() => setInquiryOpen(false)}
        onSubmit={handleSubmitInquiry}
      />

      <DetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        tour={detailsTour}
      />
    </main>
  );
}
