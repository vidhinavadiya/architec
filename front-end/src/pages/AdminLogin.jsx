import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLock, FiMail, FiShield } from "react-icons/fi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password,
      });

      if (res.data.message === "Login successful" && res.data.data?.token) {
        localStorage.setItem("adminToken", res.data.data.token);
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Access Denied: Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      
      {/* Abstract Background Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-[450px]">
        
        {/* Logo Section */}
        <div className="text-center mb-12">
            <h1 className="text-5xl font-black tracking-tighter italic text-white uppercase leading-none">
              ARCHI<span className="text-red-600">TEC</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-[1px] w-8 bg-zinc-800"></div>
                <p className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase font-bold">Secure Access</p>
                <div className="h-[1px] w-8 bg-zinc-800"></div>
            </div>
        </div>

        <div className="bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[40px] p-12 shadow-2xl">
          
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
            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black ml-1">Terminal ID</label>
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

            {/* Password Field */}
            <div className="space-y-3">
              <label className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  className="w-full bg-zinc-950 border border-white/5 text-white placeholder-zinc-700 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-red-600/50 transition-all duration-500 text-sm tracking-wide"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Login Button */}
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

        {/* Footer info */}
        <p className="text-center mt-10 text-[9px] text-zinc-600 tracking-[0.4em] uppercase font-medium italic">
          Authorized Personnel Only — System Logs Active
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;