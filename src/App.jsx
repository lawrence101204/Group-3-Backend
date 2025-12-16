import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import ToursPage from "./pages/ToursPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";

// ✅ JWT-based auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("lavera_admin_token");
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto w-full pb-10 px-4">
        <Routes>
          <Route path="/" element={<ToursPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin/*"
            element={
              isAuthenticated() ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
