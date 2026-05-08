import React, { useState, useEffect } from 'react'; // Zaroori Imports
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const About = () => {
  // --- Background Slider State ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images ki list (App.js ke public folder mein honi chahiye)
  const backgroundImages = [
    "/images/home1.jpg",
    "/images/VIEW_01.jpg",
    "/images/VIEW_02.jpg",
  ];

  // --- Auto-scroll Logic (Har 3 seconds mein) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 3000); // 3000ms = 3 seconds
    return () => clearInterval(interval); // Clean up taaki memory bug na ho
  }, [backgroundImages.length]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* ================= HERO SECTION (Minimalist & Bold with Auto-Slider) ================= */}
      <section className="relative h-[80vh] flex items-center px-6 md:px-20 lg:px-32 border-b border-white/5 overflow-hidden">
        
        {/* 1. NEW: Background Image Slider */}
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Hero Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-30 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[5000ms]`} // Fade-in aur slow zoom animation
          />
        ))}

        {/* Overlay taaki text clear dikhe */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/20 z-[1]"></div>

        {/* 2. Ghost Text Background (z-index badhana zaroori hai) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[-5%] opacity-[0.03] select-none pointer-events-none z-[5]">
          <span className="text-[20rem] md:text-[30rem] font-bold tracking-tighter leading-none">
            STUDIO
          </span>
        </div>

        {/* 3. Hero Content (details same hain) */}
        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-red-600 shadow-[0_0_10px_#ef4444]"></div>
            <p className="text-xs font-medium tracking-[0.5em] text-red-500 uppercase">Established 2021</p>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
            DEFINING <br />
            <span className="font-extralight italic text-zinc-500">THE VISION.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Based in Surat, Gujarat, India, we blend contemporary design with timeless principles, crafting architecture that inspires and endures.
          </p>
        </div>
      </section>

      {/* ================= PHILOSOPHY SECTION (Asymmetric) ================= */}
      <section className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Image with Red Accent */}
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-zinc-900">
              <img 
                src="/images/home1.jpg" 
                alt="Philosophy" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
            </div>
            {/* Red Glow Box behind image */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-red-600/20 -z-10 group-hover:border-red-600/50 transition-colors duration-500"></div>
          </div>

          {/* Right: Content */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-light tracking-tight italic mb-6">
                Our <span className="font-bold not-italic">Philosophy</span>
              </h2>
              <div className="w-20 h-[2px] bg-red-600 mb-8 shadow-[0_0_15px_rgba(225,29,72,0.4)]"></div>
              <p className="text-zinc-400 text-xl font-light leading-relaxed">
                We believe architecture is more than buildings — it's emotion, memory, and legacy. Every project is an opportunity to create spaces that function flawlessly and age with grace.
              </p>
            </div>

            {/* Core Values List */}
            <div className="grid gap-8">
              {['Integrity', 'Innovation', 'Craftsmanship'].map((value, i) => (
                <div key={i} className="group border-b border-white/5 pb-6">
                  <div className="flex items-center gap-6">
                    <span className="text-red-600 font-mono text-sm">0{i+1}</span>
                    <h3 className="text-2xl font-light tracking-widest uppercase group-hover:text-red-500 transition-colors">
                      {value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION (Clean & Impactful) ================= */}
      <section className="py-24 bg-zinc-950 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Years', val: '04+' },
            { label: 'Projects', val: '25+' },
            { label: 'Awards', val: '02' },
            { label: 'Happy Clients', val: '100%' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-5xl md:text-7xl font-bold tracking-tighter text-white">{stat.val}</p>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold italic">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION (Matching Services Style) ================= */}
      <section className="bg-black py-32 text-center relative overflow-hidden">
        {/* Background Ghost Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <span className="text-[18vw] font-bold uppercase italic leading-none select-none">Contact</span>
        </div>

        <div className="relative z-10 px-6">
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-[1px] bg-red-600 mb-8 shadow-[0_0_15px_#dc2626]"></div>
            <h3 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter leading-tight">
              Ready to Build Something <br />
              <span className="font-extralight italic text-red-600">Extraordinary?</span>
            </h3>
          </div>

          <Link 
            to="/contact" 
            className="inline-block border border-white/20 text-white font-light text-sm py-6 px-16 hover:bg-white hover:text-black transition-all duration-700 uppercase tracking-[0.4em] group"
          >
            <span className="flex items-center gap-3">
              Let's Talk 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;