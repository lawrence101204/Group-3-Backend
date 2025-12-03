export default function TourCard({ tour, onInquire, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
          {tour.type}
        </p>
        <h2 className="font-semibold text-lg">{tour.name}</h2>
        <p className="text-sm text-gray-600">{tour.locations}</p>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-[11px] px-3 py-[3px] rounded-full bg-[#d3ebd7] text-[#2b7a3d]">
            {tour.type}
          </span>
          <span className="text-[11px] px-3 py-[3px] rounded-full bg-gray-100 text-gray-700">
            {tour.duration}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-xl">
            ₱ {Number(tour.price).toLocaleString()}
          </p>
          <p className="text-[11px] text-gray-500">
            Includes: {tour.inclusions || "meals, hotels, ..."}
          </p>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {tour.details || "Explore Old Manila with a guide..."}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 border border-gray-400 rounded-full text-sm py-[6px] hover:bg-gray-50"
          onClick={() => onViewDetails && onViewDetails(tour)}
        >
          View details
        </button>
        <button
          className="flex-1 bg-[#d3ebd7] text-gray-800 rounded-full text-sm py-[6px] hover:bg-[#c1dfc7]"
          onClick={() => onInquire && onInquire(tour)}
        >
          Inquire
        </button>
      </div>
    </div>
  );
}
