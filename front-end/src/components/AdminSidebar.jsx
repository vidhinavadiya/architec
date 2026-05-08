// // src/components/AdminSidebar.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AdminSidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login", { replace: true });
//   };

//   return (
//     <div className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
//       {/* Logo Header */}
//       <div className="p-6 border-b border-zinc-800">
//         <h1 className="text-2xl font-bold tracking-tight text-red-500">ARCHITEC</h1>
//         <p className="text-zinc-500 text-sm mt-1">Admin Panel</p>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 p-6">
//         <nav className="space-y-2">
//           <button
//             onClick={() => navigate("/admin/dashboard")}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white text-left"
//           >
//             <span className="text-xl">🏠</span>
//             <span>Dashboard</span>
//           </button>

//           <button
//             onClick={() => navigate("/admin/dashboard/categories")}
//             className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-xl text-white font-medium text-left"
//           >
//             <span className="text-xl">📂</span>
//             <span>Categories</span>
//           </button>

//           <button
//   onClick={() => navigate("/admin/dashboard/subcategories")}
//   className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white text-left"
// >
//   <span className="text-xl">📁</span>
//   <span>SubCategories</span>
// </button>
// <button
//   onClick={() => navigate("/admin/dashboard/plan")}
//   className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white text-left"
// >
//   <span className="text-xl">🏗️</span>
//   <span>Plans</span>
// </button>
// <button
//   onClick={() => navigate("/admin/dashboard/contacts")}
//   className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white text-left"
// >
//   <span className="text-xl">📩</span>
//   <span>Contacts</span>
// </button>
//           {/* Future Menu Items */}
//           {/* 
//           <button
//             onClick={() => navigate("/admin/products")}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white text-left"
//           >
//             <span className="text-xl">🛍️</span>
//             <span>Products</span>
//           </button>
//           */}
//         </nav>
//       </div>

//       {/* Logout Section */}
//       <div className="p-6 border-t border-zinc-800 mt-auto">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition-colors font-medium"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FiGrid, 
  FiLayers, 
  FiFolder, 
  FiMap, 
  FiMail, 
  FiLogOut 
} from "react-icons/fi";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { name: "Categories", path: "/admin/dashboard/categories", icon: <FiLayers /> },
    { name: "SubCategories", path: "/admin/dashboard/subcategories", icon: <FiFolder /> },
    { name: "Plans", path: "/admin/dashboard/plan", icon: <FiMap /> },
    { name: "Contacts", path: "/admin/dashboard/contacts", icon: <FiMail /> },
  ];

  return (
    <div className="w-72 bg-[#080808] border-r border-white/5 flex flex-col h-screen sticky top-0 overflow-hidden">
      
      {/* Logo Header */}
      <div className="p-8 mb-4">
        <h1 className="text-2xl font-black tracking-tighter italic text-white leading-none">
          ARCHI<span className="text-red-600">TEC</span>
        </h1>
        <div className="flex items-center gap-2 mt-2">
            <div className="h-[1px] w-4 bg-red-600"></div>
            <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-bold">Terminal</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                isActive(item.path) 
                ? "bg-white text-black shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)]" 
                : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
              }`}
            >
              <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                isActive(item.path) ? "text-black" : "text-white"
              }`}>
                {item.icon}
              </span>
              <span className="text-xs tracking-[0.15em] uppercase font-bold">
                {item.name}
              </span>
              
              {isActive(item.path) && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_#dc2626]"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-6 mt-auto">
        <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-3xl">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl transition-all active:scale-95 group shadow-lg shadow-red-900/20"
            >
              <FiLogOut className="text-lg group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs tracking-widest uppercase font-black">Secure Logout</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;