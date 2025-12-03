import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isTours = location.pathname === "/";
  const isAdminArea =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  // 🔥 SECRET CLICK COUNTER FOR LOGO
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 8) {
      navigate("/admin"); // redirect to admin
      setClickCount(0); // reset counter after success
    }
  };

  return (
    <header className="bg-[#d3ebd7] shadow-sm mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Title (Secret Access Trigger) */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/lavera.png"
            alt="Lavera Bus Tour Logo"
            className="w-12 h-12 object-contain rounded-full"
          />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-lg">Lavera Bus Tour</h1>
              <span className="text-[10px] text-gray-600 border border-gray-300 rounded-full px-2 py-[1px]">
                Educational Tours
              </span>
            </div>
            <p className="text-[11px] text-gray-600">
              Contact: laveratourbus@gmail.com • +63 987 1242 252
            </p>
          </div>
        </div>

        {/* Tabs (Admin Hidden) */}
        <nav className="flex gap-2 bg-white rounded-full p-1">
          <Link
            to="/"
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              isTours ? "bg-[#d3ebd7]" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Tours
          </Link>

          {/* 🔒 ADMIN BUTTON HIDDEN */}
          {/* 
          <button
            onClick={handleAdminClick}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              isAdminArea ? "bg-[#d3ebd7]" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Admin
          </button>
          */}
        </nav>

      </div>
    </header>
  );
}
