import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLock, FiMail, FiShield, FiEye, FiEyeOff } from "react-icons/fi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const res = await axios.post(
      `${API_URL}/api/admin/login`,
      {
        email,
        password,
      }
    );
    const token = res.data?.message?.data?.token;
    if (token) {
      localStorage.setItem(
        "adminToken",
        token
      );
      navigate("/admin/dashboard", {
        replace: true
      });
    } else {
      setError("Invalid Login Details");
    }
  } catch (err) {
    console.log("LOGIN ERROR:", err.response);
    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full"></div>
      <div className="relative z-10 w-full max-w-[450px]">

        <div className="bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[40px] p-12 shadow-2xl">
       <div className="text-center mb-12">
          <h1 className="text-5xl font-black tracking-tighter italic text-white uppercase leading-none">
            ARCHI<span className="text-red-600">TEC</span>
          </h1>
        </div>
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-zinc-800 border border-white/10 rounded-2xl flex items-center justify-center text-red-600 shadow-inner">
               <FiShield size={28} />
            </div>
          </div>

          {error && (
            <div className="bg-red-600/10 border border-red-600/20 text-red-500 px-6 py-4 rounded-2xl mb-8 text-[10px] tracking-widest uppercase text-center font-bold italic animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black ml-1">Email ID</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  className="w-full bg-zinc-950 border border-white/5 text-white placeholder-zinc-700 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-red-600/50 transition-all duration-500 text-sm tracking-wide"
                  placeholder="ENTER ADMIN EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black ml-1">
                    Access Key
                  </label>

                  <div className="relative group">
                    {/* Lock Icon */}
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors">
                      <FiLock size={18} />
                    </div>

                    {/* Input */}
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-zinc-950 border border-white/5 text-white placeholder-zinc-700 rounded-2xl pl-14 pr-14 py-5 focus:outline-none focus:border-red-600/50 transition-all duration-500 text-sm tracking-wide"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {/* Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-red-600 transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full relative overflow-hidden bg-white text-black font-black py-5 rounded-2xl text-[11px] tracking-[0.3em] uppercase transition-all duration-500 hover:bg-red-600 hover:text-white active:scale-[0.98] disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Initiate Session"
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;