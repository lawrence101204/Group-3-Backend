import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ToursPage from "./pages/ToursPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";

const isAuthenticated = () =>
  localStorage.getItem("lavera_admin_token") === "lavera-admin-token";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
      <Navbar />
      <div className="max-w-6xl mx-auto pb-10">
        <Routes>
          <Route path="/" element={<ToursPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={isAuthenticated() ? <AdminLayout /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}
