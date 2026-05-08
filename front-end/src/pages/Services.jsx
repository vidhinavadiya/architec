import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
  const servicesList = [
    {
      id: "01",
      title: "Residential Design",
      subtitle: "Bespoke Living Spaces",
      desc: "Custom homes, villas, and luxury apartments designed to reflect individual lifestyles while pushing the boundaries of modern architecture.",
      image: "/images/home.jpg",
    },
    {
      id: "02",
      title: "Commercial Projects",
      subtitle: "Functional Excellence",
      desc: "Innovative office spaces, retail hubs, and hospitality environments that align with brand identities and maximize operational efficiency.",
      image: "/images/View01.jpg", 
    },
    {
      id: "03",
      title: "Interior Design",
      subtitle: "Emotional Connection",
      desc: "Thoughtful interior environments where light, material, and space converge to create a seamless human experience.",
      image: "/images/VIEW_02.jpg",
    },
    {
      id: "04",
      title: "Consultancy & Planning",
      subtitle: "Strategic Vision",
      desc: "Expert feasibility studies, master planning, and sustainability consulting to ensure every project starts on a foundation of precision.",
      image: "/images/VIEW_01.jpg",
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <section className="relative h-[70vh] flex items-center px-6 md:px-20 lg:px-32 border-b border-white/5">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 opacity-10 select-none pointer-events-none">
          <span className="text-[15rem] md:text-[25rem] font-bold tracking-tighter leading-none">
            WORK
          </span>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-red-600 shadow-[0_0_10px_#ef4444]"></div>
            <p className="text-xs font-medium tracking-[0.5em] text-red-500 uppercase">Our Capabilities</p>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
            ARCHITECTURAL <br />
            <span className="font-extralight italic text-zinc-500">SOLUTIONS.</span>
          </h1>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 space-y-48">
          {servicesList.map((service, index) => (
            <div 
              key={service.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}
            >
              <div className="relative w-full md:w-[55%] aspect-[16/9] overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={service.image}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
                <span className="absolute top-4 left-4 text-7xl font-black text-white/5 select-none">
                  {service.id}
                </span>
              </div>
              <div className="w-full md:w-[45%] space-y-8">
                <div className="space-y-4">
                  <p className="text-red-600 text-xs tracking-[0.5em] font-bold uppercase italic">
                    {service.subtitle}
                  </p>
                  <h2 className="text-4xl lg:text-6xl font-light tracking-tighter leading-tight group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h2>
                </div>
                <div className="h-[1px] w-20 bg-zinc-800"></div>
                <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-md">
                  {service.desc}
                </p>
                <div className="pt-4">
                    <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-zinc-500 group-hover:text-white transition-all">
                        <span>Learn More</span>
                        <div className="w-10 h-[1px] bg-zinc-800 group-hover:w-16 group-hover:bg-red-600 transition-all duration-500"></div>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 py-32 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <span className="text-[20vw] font-bold uppercase italic">Inquiry</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-4xl lg:text-6xl font-bold mb-12 tracking-tighter">
            Let's build something <br />
            <span className="font-extralight italic text-red-600">extraordinary.</span>
          </h3>
          <Link 
            to="/contact" 
            className="inline-block border border-white/20 text-white font-light text-sm py-6 px-16 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.4em]"
          >
            Start a Project
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;