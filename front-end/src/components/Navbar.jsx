// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   // SCROLL EFFECT
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // FETCH CATEGORIES (Desktop Mega Menu only)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/admin/category/all");
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // FETCH SUBCATEGORIES
//   const fetchSubCategories = async (categoryId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/admin/subcategory/category/${categoryId}`
//       );
//       setSubcategories(res.data.data || []);
//       setActiveCategory(categoryId);
//     } catch (err) {
//       console.error("Error fetching subcategories:", err);
//     }
//   };

//   return (
//     <>
//       {/* ================= MAIN NAVBAR ================= */}
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-black/95 backdrop-blur-md border-b border-white/10"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="flex justify-between items-center h-20 md:h-24">

//             {/* LOGO */}
//             <Link 
//               to="/home" 
//               className="flex flex-col leading-none text-white transition-colors duration-300"
//             >
//               <span className="font-playfair text-3xl md:text-4xl tracking-widest">
//                 ARCHITECTURE
//               </span>
//               <span className="text-xs uppercase tracking-[0.4em] text-gray-400 mt-1">
//                 ArchiTec
//               </span>
//             </Link>

//             {/* ================= DESKTOP MENU ================= */}
//             <div className="hidden lg:flex items-center gap-10 text-white uppercase tracking-widest text-sm font-medium">

//               <Link to="/home" className="hover:text-gray-300 transition-colors">Home</Link>

//               {/* PROJECTS MEGA MENU - Only Categories + Subcategories */}
//               <div className="relative group">
//                 <button className="hover:text-gray-300 transition-colors flex items-center gap-1">
//                   Projects
//                   <span className="text-xs">▼</span>
//                 </button>

//                 {/* Mega Menu Dropdown */}
//                 <div className="absolute top-[85px] left-1/2 -translate-x-1/2 w-screen max-w-5xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
//                   <div className="bg-white text-black shadow-2xl border-t-4 border-red-600 rounded-b-2xl overflow-hidden">
                    
//                     {/* CATEGORY BAR */}
//                     <div className="border-b border-gray-200 py-4">
//                       <div className="max-w-7xl mx-auto px-12 flex gap-10 justify-center">
//                         {categories.map((cat) => (
//                           <button
//                             key={cat.id}
//                             onClick={() => fetchSubCategories(cat.id)}
//                             className={`text-base font-medium transition-colors hover:text-red-600 ${
//                               activeCategory === cat.id 
//                                 ? "text-red-600 border-b-2 border-red-600 pb-1" 
//                                 : "text-gray-800"
//                             }`}
//                           >
//                             {cat.title}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* SUBCATEGORY BAR */}
//                     {activeCategory && subcategories.length > 0 && (
//                       <div className="py-6 bg-gray-50">
//                         <div className="max-w-7xl mx-auto px-12 flex flex-wrap justify-center gap-x-12 gap-y-4">
//                           {subcategories.map((sub) => (
//                             <Link
//                               key={sub.id}
//                               to={`/subcategory/${sub.id}`}
//                               onClick={() => {
//                                 setOpen(false);
//                                 setActiveCategory(null);
//                               }}
//                               className="text-base hover:text-red-600 transition-colors duration-200"
//                             >
//                               {sub.title}
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {activeCategory && subcategories.length === 0 && (
//                       <div className="py-12 text-center text-gray-500">
//                         No subcategories available
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <Link to="/services" className="hover:text-gray-300 transition-colors">Services</Link>
//               <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
//               <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
//             </div>

//             {/* ================= HAMBURGER BUTTON (Now visible on Laptop also) ================= */}
//             <button 
//               onClick={() => setOpen(true)} 
//               className="text-white text-3xl focus:outline-none lg:block hidden" // Changed: visible on lg also
//             >
//               ☰
//             </button>

//             {/* Mobile Hamburger - Only for small screens */}
//             <button 
//               onClick={() => setOpen(true)} 
//               className="lg:hidden text-white text-3xl focus:outline-none"
//             >
//               ☰
//             </button>

//           </div>
//         </div>
//       </nav>

//       {/* ================= SLIDE MENU (Same for Mobile & Laptop) ================= */}
//       {open && (
//         <div 
//           className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <div
//         className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 z-[9999] overflow-y-auto transition-transform duration-500 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="p-8 border-b border-white/10 flex justify-between items-center">
//           <span className="font-playfair text-3xl text-white tracking-wider">ArchiTec</span>
//           <button 
//             onClick={() => setOpen(false)} 
//             className="text-white text-4xl leading-none hover:text-gray-300"
//           >
//             ×
//           </button>
//         </div>

//         {/* Menu Links - Same as Mobile */}
//         <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-10 text-2xl uppercase tracking-widest text-white pt-10">
          
//           <Link 
//             to="/home" 
//             onClick={() => setOpen(false)} 
//             className="hover:text-white/70 transition-colors"
//           >
//             Home
//           </Link>

//           <Link 
//             to="/products" 
//             onClick={() => setOpen(false)} 
//             className="hover:text-white/70 transition-colors"
//           >
//             Projects
//           </Link>

//           <Link 
//             to="/services" 
//             onClick={() => setOpen(false)} 
//             className="hover:text-white/70 transition-colors"
//           >
//             Services
//           </Link>
          
//           <Link 
//             to="/about" 
//             onClick={() => setOpen(false)} 
//             className="hover:text-white/70 transition-colors"
//           >
//             About
//           </Link>
          
//           <Link 
//             to="/contact" 
//             onClick={() => setOpen(false)} 
//             className="hover:text-white/70 transition-colors"
//           >
//             Contact
//           </Link>
//         </div>

//         {/* CTA Button */}
//         <div className="absolute bottom-12 left-0 right-0 px-8">
//           <Link 
//             to="/contact"
//             onClick={() => setOpen(false)}
//             className="block w-full bg-white text-black py-4 text-center rounded-full uppercase tracking-wider font-medium hover:bg-gray-200 transition-all active:scale-95"
//           >
//             Get In Touch
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= MAIN NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20 md:h-24">

            {/* LOGO */}
            <Link 
              to="/home" 
              className="flex flex-col leading-none text-white transition-colors duration-300"
            >
              <span className="font-playfair text-3xl md:text-4xl tracking-widest">
                EVIQESTUDIO
              </span>
              <span className="text-xs uppercase tracking-[0.4em] text-gray-400 mt-1">
                ArchiTec
              </span>
            </Link>

            {/* ================= DESKTOP MENU (Simple - No Mega Menu) ================= */}
            <div className="hidden lg:flex items-center gap-10 text-white uppercase tracking-widest text-sm font-medium">

              <Link to="/home" className="hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-gray-300 transition-colors">Projects</Link>
              <Link to="/services" className="hover:text-gray-300 transition-colors">Services</Link>
              <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>

            </div>

            {/* ================= HAMBURGER BUTTON (Visible on both Laptop & Mobile) ================= */}
            <button 
              onClick={() => setOpen(true)} 
              className="text-white text-3xl focus:outline-none"
            >
              ☰
            </button>

          </div>
        </div>
      </nav>

      {/* ================= SLIDE MENU (For Mobile + Laptop) ================= */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/10 z-[9999] overflow-y-auto transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <span className="font-playfair text-3xl text-white tracking-wider">ArchiTec</span>
          <button 
            onClick={() => setOpen(false)} 
            className="text-white text-4xl leading-none hover:text-gray-300"
          >
            ×
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-10 text-2xl uppercase tracking-widest text-white pt-10">
          
          <Link 
            to="/home" 
            onClick={() => setOpen(false)} 
            className="hover:text-white/70 transition-colors"
          >
            Home
          </Link>

          <Link 
            to="/products" 
            onClick={() => setOpen(false)} 
            className="hover:text-white/70 transition-colors"
          >
            Projects
          </Link>

          <Link 
            to="/services" 
            onClick={() => setOpen(false)} 
            className="hover:text-white/70 transition-colors"
          >
            Services
          </Link>
          
          <Link 
            to="/about" 
            onClick={() => setOpen(false)} 
            className="hover:text-white/70 transition-colors"
          >
            About
          </Link>
          
          <Link 
            to="/contact" 
            onClick={() => setOpen(false)} 
            className="hover:text-white/70 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-12 left-0 right-0 px-8">
          <Link 
            to="/contact"
            onClick={() => setOpen(false)}
            className="block w-full bg-white text-black py-4 text-center rounded-full uppercase tracking-wider font-medium hover:bg-gray-200 transition-all active:scale-95"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;