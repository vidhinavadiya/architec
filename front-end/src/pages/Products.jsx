import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const heroImages = [
    "/images/home1.jpg",
    "/images/View01.jpg",
    "/images/VIEW_02.jpg",
    "/images/VIEW_01.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/category/all")
      .then(res => setCategories(res.data.categories || []))
      .catch(err => console.error(err));
  }, []);

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/admin/subcategory/category/${categoryId}`);
      setSubcategories(res.data.data || []);
      setActiveCategory(categoryId);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlansBySubcategory = async (subId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/admin/plan/subcategory/${subId}`);
      setPlans(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/plan/all")
      .then(res => setPlans(res.data || []))
      .catch(err => console.error(err));
  }, []);

  const openProject = (plan) => {
    setSelectedPlan(plan);
  };

  const closeProject = () => {
    setSelectedPlan(null);
  };

  useEffect(() => {
  let interval;
  if (selectedPlan) {
    const container = document.getElementById('horizontal-scroll-container');
    interval = setInterval(() => {
      if (container) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScrollLeft - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
        }
      }
    }, 4000);
  }
  return () => clearInterval(interval);
}, [selectedPlan]);

  useEffect(() => {
      if (location.state?.categoryId) {
        fetchSubCategories(location.state.categoryId);
              if (location.state?.subCategoryId) {
          fetchPlansBySubcategory(location.state.subCategoryId);
        }
      } else {
        axios.get("http://localhost:3000/api/admin/plan/all")
          .then(res => setPlans(res.data || []))
          .catch(err => console.error(err));
      }
    }, [location.state]);


const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plan.city && plan.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (plan.typology && plan.typology.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Navbar showCategoryBar={true} />
      <section className="relative bg-black pt-20">
        <div className="bg-black/90 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center gap-10 py-6 uppercase text-sm tracking-widest">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => fetchSubCategories(cat.id)}
                  className={`relative pb-2 transition-colors ${activeCategory === cat.id ? "text-white" : "text-gray-500 hover:text-white"}`}
                >
                  {cat.title}
                  {activeCategory === cat.id && <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444]"></span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-950/50 border-b border-white/5 py-4">
          <div className="max-w-xl mx-auto px-6 relative group">
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search by project name, city or typology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-3 pl-12 pr-6 text-xs tracking-widest text-white placeholder:text-zinc-700 focus:outline-none focus:border-red-600/50 focus:bg-zinc-900 transition-all uppercase"
            />
          </div>
        </div>

        {activeCategory && (
          <div className="bg-black/80 border-b border-white/10 py-5">
            <div className="max-w-7xl mx-auto px-6 flex justify-center gap-8 flex-wrap">
              {subcategories.map(sub => (
                <button 
                  key={sub.id} 
                  onClick={() => fetchPlansBySubcategory(sub.id)}
                  className="text-gray-400 hover:text-white text-sm uppercase transition-colors"
                >
                  {sub.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="relative h-[50vh] w-full overflow-hidden bg-black">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Header Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-50 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[5000ms]`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-red-600 to-rose-600 mb-8 shadow-[0_0_15px_rgba(225,29,72,0.5)]"></div>
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tighter text-white mb-6 uppercase">
            Our <span className="font-extralight italic">Architectural</span> Design
            <span className="text-red-600">.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our diverse range of design solutions — from residential elegance to commercial innovation.
          </p>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <div 
                key={index}
                className={`h-[2px] transition-all duration-500 ${
                  index === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

 <section className="bg-black text-white py-24 overflow-x-hidden">
  <div className="max-w-[1400px] mx-auto px-6 space-y-40">
    {filteredPlans.length > 0 ? (
      filteredPlans.map((plan, index) => (
        <div 
          key={plan.id}
          className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center cursor-pointer group`}
          onClick={() => openProject(plan)}
        >
          <div className="relative w-full md:w-[60%] overflow-hidden rounded-sm bg-zinc-900 aspect-[16/10]">
            {plan.sections?.find(s => s.type === "image") && (
              <img
                src={`http://localhost:3000/uploads/plans/${plan.sections.find(s => s.type === "image").content}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out opacity-90 group-hover:opacity-100"
                alt={plan.title}
              />
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>

          <div className="w-full md:w-[40%] space-y-8">
            <div className="flex items-center gap-6">
              <div className="h-[1px] w-12 bg-red-600 transition-all duration-700 group-hover:w-20"></div>
              <p className="text-zinc-500 uppercase text-xs tracking-[0.4em] font-medium">
                  Project {index + 1}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-light tracking-tighter leading-tight group-hover:text-red-500 transition-colors duration-500">
                {plan.title}
              </h2>
              
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm uppercase tracking-widest font-light">
                  {plan.city}, {plan.country}
                </p>
                <p className="text-zinc-600 text-xs tracking-widest font-medium">
                  {plan.year} — COMPLETED
                </p>
              </div>
            </div>

            {plan.icon && (
              <img 
                src={`http://localhost:3000/uploads/icons/${plan.icon}`} 
                className="w-10 h-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700" 
                alt="icon" 
              />
            )}
            
            <button className="text-xs uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white border-b border-zinc-800 group-hover:border-red-600 pb-2 transition-all">
              View Case Study
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-zinc-950/50 rounded-lg">
        <div className="w-20 h-20 mb-8 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10">
          <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-light tracking-widest uppercase text-white mb-3">No Results Found</h2>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">
          No projects match your search "{searchTerm}"
        </p>
        <button 
           onClick={() => setSearchTerm("")}
           className="mt-6 text-red-600 text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors"
        >
          Clear Search
        </button>
      </div>
    )}
  </div>
</section>

{selectedPlan && (
  <div className="fixed inset-0 bg-black z-[100] overflow-hidden">
    <button 
      onClick={closeProject}
      className="fixed top-8 right-8 z-[120] text-white text-4xl hover:text-red-500 transition-colors bg-black/50 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border border-white/10"
    >
      ✕
    </button>
    <div 
      id="horizontal-scroll-container"
      className="flex flex-nowrap h-screen overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory scroll-smooth">
      <div className="flex-none w-screen h-screen snap-center relative">
        {selectedPlan.sections?.find(s => s.type === "image") && (
          <img
            src={`http://localhost:3000/uploads/plans/${selectedPlan.sections.find(s => s.type === "image").content}`}
            className="w-full h-full object-cover"
            alt="hero"
          />
        )}
        
        <div className="absolute bottom-20 left-12 z-20">
          <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl">
            {selectedPlan.title}
          </h1>
          <p className="text-red-500 text-xl tracking-[0.5em] mt-4 font-bold">
            {selectedPlan.city} — {selectedPlan.year}
          </p>
        </div>

        <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end gap-2">
          <div className="bg-black/60 backdrop-blur-xl px-6 py-4 rounded-full border border-white/10 flex items-center gap-4 shadow-2xl animate-bounce-horizontal">
            <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">
              Scroll to explore
            </span>
            <div className="flex items-center">
              <div className="h-[1px] w-8 bg-red-600"></div>
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 animate-loading-bar"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20"></div>
      </div>

      <div className="flex-none w-[450px] h-screen bg-zinc-950 border-r border-white/10 flex flex-col justify-center px-16 snap-center">
        <h3 className="text-red-600 text-xs uppercase tracking-[0.5em] mb-12 font-bold italic underline underline-offset-8">Specifications</h3>
        <div className="space-y-12">
          <div className="border-l border-white/10 pl-6">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Typology</p>
            <p className="text-white text-2xl font-light">{selectedPlan.typology || "Architectural Design"}</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Location</p>
            <p className="text-white text-2xl font-light">{selectedPlan.city}, {selectedPlan.country}</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Size</p>
            <p className="text-white text-2xl font-light">{selectedPlan.size}</p>
          </div>
        </div>
      </div>

      {selectedPlan.sections.map((sec, index) => (
        <React.Fragment key={index}>
          {sec.type === "image" ? (
            <div className="flex-none w-[90vw] h-screen snap-center p-10 bg-black">
              <img 
                src={`http://localhost:3000/uploads/plans/${sec.content}`} 
                className="w-full h-full object-cover rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5" 
                alt="detail" 
              />
            </div>
          ) : (
            <div className="flex-none w-[600px] h-screen flex flex-col justify-center px-20 bg-zinc-950 border-x border-white/5 snap-center">
               <div className="w-20 h-[2px] bg-red-600 mb-10"></div>
               <div className="prose prose-invert prose-2xl text-zinc-200 font-extralight leading-relaxed tracking-tight italic">
                 {sec.content}
               </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
)}

  <section className="bg-zinc-950 py-32 text-center border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
      <span className="text-[18vw] font-bold uppercase italic leading-none select-none">
        Inquiry
      </span>
    </div>

    <div className="relative z-10 px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="w-12 h-[1px] bg-red-600 mb-8 shadow-[0_0_15px_#dc2626]"></div>
        <h3 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter leading-tight">
          Interested in a <br />
          <span className="font-extralight italic text-red-600">Custom Project?</span>
        </h3>
      </div>

      <Link 
        to="/contact" 
        className="inline-block border border-white/20 text-white font-light text-sm py-6 px-16 hover:bg-white hover:text-black transition-all duration-700 uppercase tracking-[0.4em] group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
          Contact Us 
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </span>
      </Link>
    </div>
  </section>
      <Footer />
    </>
  );
};

export default Products;