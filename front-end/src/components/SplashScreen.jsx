import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-black text-white font-inter antialiased overflow-hidden relative flex items-center justify-center">

      {/* Background Image with architectural treatment */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
        style={{ 
          // backgroundImage: `url('/images/splash-screen.jpg')`,
          filter: 'brightness(0.3) grayscale(100%) contrast(1.2)' 
        }}
      />

      {/* Luxury Red & Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-12 relative group">
          <div className="absolute inset-0 bg-red-600/20 blur-[50px] rounded-full animate-pulse"></div>
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="relative z-10 mx-auto w-40 md:w-48 h-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-float"
          />
        </div>

        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-2">
             <div className="h-[1px] w-8 bg-red-600 animate-expand"></div>
             <span className="text-red-600 text-xs tracking-[0.8em] uppercase font-bold">Innovation</span>
             <div className="h-[1px] w-8 bg-red-600 animate-expand"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] text-white uppercase leading-none">
            ARCHI<span className="font-bold text-red-600">TEC</span>
          </h1>
          
          <p className="text-zinc-500 text-[10px] md:text-xs tracking-[1em] uppercase mt-6 opacity-0 animate-fade-in-delayed">
            Designing Future Spaces
          </p>
        </div>

        {/* Professional Progress Loader */}
        <div className="absolute bottom-20 flex flex-col items-center gap-4">
          <div className="w-64 h-[2px] bg-white/5 overflow-hidden rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-progress-bar" />
          </div>
          <span className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] animate-pulse">
            Loading Experience
          </span>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom { animation: slow-zoom 8s ease-out forwards; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes expand {
          0% { width: 0; opacity: 0; }
          100% { width: 40px; opacity: 1; }
        }
        .animate-expand { animation: expand 1.5s ease-out forwards; }

        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-delayed { animation: fade-in-delayed 2s ease-out 1s forwards; }

        @keyframes progress-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-bar { animation: progress-bar 3s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
      `}</style>
    </div>
  );
};

export default SplashScreen;