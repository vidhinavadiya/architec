import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      const fetchData = async () => {
        try {
          const catRes = await axios.get("http://localhost:3000/api/admin/category/all");
          setCategories(catRes.data.categories || []);
          const subRes = await axios.get("http://localhost:3000/api/admin/subcategory/all");
          setSubcategories(subRes.data.data || []);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }, []);

    const handleCategoryClick = (categoryId) => {
      navigate('/products', { state: { categoryId } });
    };

    const handleSubcategoryClick = (subCategoryId, categoryId) => {
      navigate('/products', { state: { subCategoryId, categoryId } });
    };

  return (
    <>
      <Navbar />
      
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Architecture ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-60 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[5000ms]`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-[15%] md:right-[20%] lg:right-[25%] z-30 flex flex-col items-end pointer-events-none">
          <span className="text-[140px] md:text-[180px] lg:text-[220px] font-extralight text-white/10 leading-none select-none tracking-tighter">
            20
          </span>
        <span className="text-5xl md:text-7xl lg:text-8xl font-light text-white/40 -mt-10 lg:-mt-16 pr-4 tracking-tighter">
          26
        </span>
          <div className="h-40 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent mt-10 mr-10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
        </div>

        <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-20 lg:px-32">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
              <p className="text-xs md:text-sm font-medium tracking-[0.4em] text-white/80 uppercase">
                Design • BUILDING • CONSTRUCTION
              </p>
            </div>
            <h1 className="flex flex-col mb-12">
              <span className="text-5xl md:text-7xl lg:text-9xl font-extralight text-white leading-tight tracking-tight">
                CRAFTING
              </span>
              <span className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white leading-none -mt-2 tracking-tighter italic">
                SPACES
                <span className="not-italic bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                  .
                </span>
              </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 max-w-3xl">
              <div className="group">
                <p className="text-[10px] text-white/40 tracking-widest uppercase mb-2">Digital Office</p>
                <a href="https://www.architec.com" target="_blank" rel="noreferrer" className="text-sm text-white/80 group-hover:text-white transition-all">
                  www.architec.com
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] text-white/40 tracking-widest uppercase mb-2">Inquiries</p>
                <a href="mailto:nd7046@gmail.com" className="text-sm text-white/80 group-hover:text-white transition-all">
                  nd7046@gmail.com
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] text-white/40 tracking-widest uppercase mb-2">Connect</p>
                <a href="tel:+919624038826" className="text-sm text-white/80 group-hover:text-white transition-all">
                  +91 96240 38826
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-8 md:left-20 flex items-center gap-6 z-30">
          <div className="flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 h-[2px] ${
                  index === currentSlide ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <span className="text-white/40 text-xs font-mono">0{currentSlide + 1} / 0{heroImages.length}</span>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce pointer-events-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      <section className="bg-black text-white py-24">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="w-12 h-[1px] bg-gradient-to-r from-red-600 to-rose-600 mb-4 shadow-[0_0_15px_rgba(225,29,72,0.4)]"></div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight italic">
                Our <span className="font-bold not-italic">Expertise</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm hidden md:block max-w-[200px] text-right font-light italic">
              Exploring the intersection of geometry and human experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px] lg:auto-rows-[350px]">
            {categories.map((cat, index) => {
              const spanClass = 
                index === 0 ? "lg:col-span-2 lg:row-span-1" : 
                index === 1 ? "lg:col-span-1 lg:row-span-1" :
                index === 2 ? "lg:col-span-1 lg:row-span-2" :
                index === 3 ? "lg:col-span-2 lg:row-span-1" : 
                "lg:col-span-1";

              return (
                <div 
                  key={cat.id || index} 
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`relative group overflow-hidden rounded-sm cursor-pointer border border-white/5 ${spanClass}`}
                >
                  <img
                    src={`http://localhost:3000/uploads/categories/${cat.image}`}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 translate-y-3 group-hover:translate-y-0">
                    <p className="text-sm text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2 max-w-sm font-light">
                      {cat.description}
                    </p>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-rose-500 group-hover:bg-clip-text group-hover:text-transparent drop-shadow-[0_2px_10px_rgba(225,29,72,0.4)]">
                      {cat.title}
                    </h3>
                    <div className="w-0 group-hover:w-16 h-[2px] bg-gradient-to-r from-red-600 to-rose-600 mt-5 transition-all duration-500 shadow-[0_0_10px_rgba(225,29,72,0.6)]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-red-600 to-rose-600 w-0 group-hover:w-full transition-all duration-700 shadow-[0_-4px_20px_rgba(225,29,72,0.9)]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-24 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="w-12 h-[1px] bg-gradient-to-r from-red-600 to-rose-600 mb-4 shadow-[0_0_15px_rgba(225,29,72,0.4)]"></div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight italic">
                Specialized <span className="font-bold not-italic">Sectors</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm hidden md:block max-w-[200px] text-right font-light italic">
              Detailed sub-divisions of our architectural landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories.map((sub, index) => {
               const isTall = index % 3 === 0; 
               
               return (
                <div 
                  key={sub.id} 
                  onClick={() => handleSubcategoryClick(sub.id, sub.category?.id)}
                  className={`relative group overflow-hidden rounded-xl bg-zinc-900 border border-white/10 ${isTall ? 'md:row-span-2' : ''}`}
                >
                  <div className="h-full w-full">
                    <img
                      src={`http://localhost:3000/uploads/subcategories/${sub.image}`}
                      alt={sub.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                    <p className="text-sm text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2 max-w-sm font-light">
                      {sub.description}
                    </p>
                     <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase mb-2 font-bold">
                      {sub.category?.title}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-rose-500 group-hover:bg-clip-text group-hover:text-transparent drop-shadow-[0_2px_10px_rgba(225,29,72,0.4)]">
                      {sub.title}
                    </h3>
                    <div className="h-[2px] w-0 group-hover:w-full bg-red-600 transition-all duration-700 mt-4 shadow-[0_0_15px_#dc2626]"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </section>
      <Footer />
    </>
  );
};

export default Home;