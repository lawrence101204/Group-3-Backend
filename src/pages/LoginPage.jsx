import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        localStorage.setItem("lavera_admin_token", data.token);
        navigate("/admin");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      alert("Error logging in.");
    }
  };

  return (
    <main className="min-h-screen bg-[#edf7ef] flex items-center justify-center px-4">
      
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 animate-fadeIn relative">

        {/* Lavera Logo */}
        <div className="absolute left-1/2 -top-14 -translate-x-1/2">
          <img
            src="/lavera.png"
            className="w-28 h-28 rounded-full ring-4 ring-green-200 shadow-xl object-cover bg-white animate-bounceSlow"
            alt="Lavera Logo"
          />
        </div>

        <div className="mt-16 text-center">
          <h1 className="text-3xl font-bold text-gray-700">WELCOME</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to manage Lavera Bus Tours
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

          {/* Username */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Username</label>
            <div className="flex items-center gap-3 border bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
              <span className="text-purple-600 text-xl">👤</span>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={form.username}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-600">Password</label>
            <div className="flex items-center gap-3 border bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
              <span className="text-yellow-600 text-xl">🔒</span>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={form.password}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Enter password"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="text-gray-500 text-lg cursor-pointer"
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <p className="text-right text-xs text-gray-500 hover:underline cursor-pointer">
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition active:scale-95"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* animations */}
      <style>{`
        .animate-bounceSlow {
          animation: bounceSlow 3s infinite ease-in-out;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fadeIn {
          animation: fadeIn .8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </main>
  );
}
