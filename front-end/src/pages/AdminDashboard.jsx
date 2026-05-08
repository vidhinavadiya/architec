// import React, { useEffect, useState } from "react";
// import { useNavigate, Outlet, useLocation } from "react-router-dom";
// import axios from "axios";
// import AdminSidebar from "../components/AdminSidebar";
// import { FiLayers, FiFolder, FiMap, FiMail, FiActivity } from "react-icons/fi";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     categories: 0,
//     subcategories: 0,
//     plans: 0,
//     contacts: 0
//   });

//   const token = localStorage.getItem("adminToken");

//   useEffect(() => {
//     if (!token) {
//       navigate("/admin/login", { replace: true });
//     } else {
//       fetchDashboardStats();
//     }
//   }, [navigate]);

// const fetchDashboardStats = async () => {
//     try {
//       const [catRes, subRes, planRes, contactRes] = await Promise.all([
//         axios.get("http://localhost:3000/api/admin/category/all"),
//         axios.get("http://localhost:3000/api/admin/subcategory/all"),
//         axios.get("http://localhost:3000/api/admin/plan/all"),
//         axios.get("http://localhost:3000/api/user/contact/all", {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);

//       // Helper function to get length safely from any structure
//       const getLength = (res) => {
//         if (!res || !res.data) return 0;
        
//         // 1. Agar direct array hai: res.data = [...]
//         if (Array.isArray(res.data)) return res.data.length;
        
//         // 2. Agar object ke andar named array hai: res.data.categories ya res.data.subcategories
//         const keys = Object.keys(res.data);
//         for (let key of keys) {
//           if (Array.isArray(res.data[key])) {
//             return res.data[key].length;
//           }
//         }

//         // 3. Agar 'data' property ke andar array hai: res.data.data = [...]
//         if (res.data.data && Array.isArray(res.data.data)) return res.data.data.length;

//         return 0;
//       };

//       setStats({
//         categories: getLength(catRes),
//         subcategories: getLength(subRes),
//         plans: getLength(planRes),
//         contacts: getLength(contactRes)
//       });

//     } catch (err) {
//       console.error("Dashboard Stats Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isMainDashboard = location.pathname === "/admin/dashboard" || location.pathname === "/admin/dashboard/";

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#050505] flex items-center justify-center italic tracking-[0.3em] text-zinc-500 uppercase text-xs">
//         Syncing Architectural Data...
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 shrink-0 z-20">
//           <h2 className="text-sm font-black tracking-[0.3em] uppercase italic">System <span className="text-red-600">Overview</span></h2>
//           <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full">
//             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//             <span className="text-[10px] tracking-widest uppercase font-bold text-zinc-400">Server: Online</span>
//           </div>
//         </header>

//         <div className="flex-1 overflow-auto bg-[#050505]">
//           {isMainDashboard ? (
//             <div className="p-10 max-w-7xl mx-auto">
//               <div className="mb-12">
//                 <h1 className="text-5xl font-bold tracking-tighter uppercase italic">Welcome back, <span className="text-red-600">Admin</span></h1>
//                 <p className="text-zinc-500 mt-2 tracking-[0.2em] text-[10px] uppercase font-bold italic">Terminal Active / Real-time Data Feed</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                 <StatCard title="Total Categories" value={stats.categories} icon={<FiLayers />} color="text-white" />
//                 <StatCard title="Sub Categories" value={stats.subcategories} icon={<FiFolder />} color="text-white" />
//                 <StatCard title="Active Plans" value={stats.plans} icon={<FiMap />} color="text-red-600" />
//                 <StatCard title="User Inquiries" value={stats.contacts} icon={<FiMail />} color="text-white" />
//               </div>

//               <div className="bg-zinc-900/20 border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center min-h-[300px] text-center border-dashed">
//                 <FiActivity size={40} className="text-zinc-800 mb-4" />
//                 <h3 className="text-zinc-500 tracking-widest uppercase text-[10px] font-bold">System Status: Optimal</h3>
//               </div>
//             </div>
//           ) : <Outlet />}
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, color }) => (
//   <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[32px] hover:border-red-600/30 transition-all duration-500 group">
//     <div className="flex justify-between items-start mb-6">
//       <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-red-600/10 transition-colors">
//         <span className={`${color} text-2xl`}>{icon}</span>
//       </div>
//     </div>
//     <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-black mb-1">{title}</p>
//     <h4 className="text-5xl font-bold tracking-tighter italic">{value}</h4>
//   </div>
// );

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { FiLayers, FiFolder, FiMap, FiMail, FiActivity } from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    categories: 0,
    subcategories: 0,
    plans: 0,
    contacts: 0
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    } else {
      fetchDashboardStats();
    }
  }, [navigate]);

  // Robust Fetching Logic (Categories, Subcategories, Plans, Contacts counts)
  const fetchDashboardStats = async () => {
    try {
      const [catRes, subRes, planRes, contactRes] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/category/all"),
        axios.get("http://localhost:3000/api/admin/subcategory/all"),
        axios.get("http://localhost:3000/api/admin/plan/all"),
        axios.get("http://localhost:3000/api/user/contact/all", {
            headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      // Universal logic to safely get length from any response structure
      const getLength = (res) => {
        if (!res || !res.data) return 0;
        
        // Case 1: Direct Array [ ... ]
        if (Array.isArray(res.data)) return res.data.length;
        
        // Case 2: Named Key with Array { 'subcategories': [...] }
        const keys = Object.keys(res.data);
        for (let key of keys) {
          if (Array.isArray(res.data[key])) {
            return res.data[key].length;
          }
        }

        // Case 3: Nested Data Key { data: [...] }
        if (res.data.data && Array.isArray(res.data.data)) return res.data.data.length;

        return 0;
      };

      setStats({
        categories: getLength(catRes),
        subcategories: getLength(subRes),
        plans: getLength(planRes),
        contacts: getLength(contactRes)
      });

    } catch (err) {
      console.error("Dashboard Stats Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const isMainDashboard = location.pathname === "/admin/dashboard" || location.pathname === "/admin/dashboard/";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center italic tracking-[0.3em] text-zinc-500 uppercase text-xs">
        Connecting Architectural Terminal...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Glassmorphism effect */}
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 shrink-0 z-20">
          <h2 className="text-sm font-black tracking-[0.3em] uppercase italic">System <span className="text-red-600">Overview</span></h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-zinc-400">Feed: Real-Time</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-[#050505] custom-scrollbar">
          {isMainDashboard ? (
            <div className="p-10 max-w-7xl mx-auto">
              {/* Brutalist Style Welcome */}
              <div className="mb-12">
                <h1 className="text-5xl font-bold tracking-tighter uppercase italic">Welcome back, <span className="text-red-600 text-stroke-white">Admin</span></h1>
                <p className="text-zinc-500 mt-2 tracking-[0.2em] text-[10px] uppercase font-bold italic">Command Center / Architectural Interface</p>
              </div>

              {/* Statistics Grid - Icons Red Tweak Applied */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                
                <StatCard 
                    title="Total Categories" 
                    value={stats.categories} 
                    icon={<FiLayers />} 
                    iconColor="text-red-600" // Red Accent
                />
                
                <StatCard 
                    title="Sub Categories" 
                    value={stats.subcategories} 
                    icon={<FiFolder />} 
                    iconColor="text-red-600" // Red Accent
                />
                
                <StatCard 
                    title="Active Plans" 
                    value={stats.plans} 
                    icon={<FiMap />} 
                    iconColor="text-red-600" // Red Accent
                />
                
                <StatCard 
                    title="User Inquiries" 
                    value={stats.contacts} 
                    icon={<FiMail />} 
                    iconColor="text-red-600" // Red Accent
                />

              </div>

              {/* Status Section Placeholder */}
              <div className="bg-zinc-900/20 border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center min-h-[300px] text-center border-dashed group">
                <FiActivity size={40} className="text-zinc-800 mb-4 group-hover:text-red-900 transition-colors" />
                <h3 className="text-zinc-500 tracking-widest uppercase text-xs font-bold italic">Analytical Node Off-line</h3>
                <p className="text-zinc-700 text-[10px] mt-2 tracking-widest uppercase">System integration pending architectural approval</p>
              </div>

            </div>
          ) : <Outlet />}
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component with Architecture Theme
const StatCard = ({ title, value, icon, iconColor }) => (
  <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[32px] hover:border-red-600/30 transition-all duration-500 group shadow-lg">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-red-600/10 transition-colors">
        {/* Icon gets Red Accent Color */}
        <span className={`${iconColor} text-2xl`}>{icon}</span>
      </div>
      <div className="h-1 w-8 bg-zinc-800 rounded-full mt-4 group-hover:bg-red-600 transition-colors"></div>
    </div>
    <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-black mb-1">{title}</p>
    <h4 className="text-5xl font-bold tracking-tighter italic text-white group-hover:text-red-500 transition-colors">{value}</h4>
  </div>
);

export default AdminDashboard;