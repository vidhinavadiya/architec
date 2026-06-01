import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-black text-white font-inter antialiased overflow-hidden flex items-center justify-center relative">

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-[380px]">

        {/* Unique Architec Logo */}
        <div className="mb-12 md:mb-16 relative">
          <div className="absolute inset-0 bg-red-600/10 blur-[70px] rounded-full animate-pulse" />
          
          <svg 
            width="160" 
            height="160" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_35px_rgba(220,38,38,0.45)] animate-float mx-auto"
          >
            <circle cx="100" cy="100" r="92" stroke="#991b1b" strokeWidth="4" strokeOpacity="0.3"/>
            <circle cx="100" cy="100" r="78" stroke="#ef4444" strokeWidth="6" />
            
            <path d="M65 130 L65 75 L100 45 L135 75 L135 130" stroke="#ef4444" strokeWidth="12" strokeLinejoin="round" fill="none"/>
            <path d="M78 130 L78 88 L100 70 L122 88 L122 130" stroke="#991b1b" strokeWidth="8" strokeLinejoin="round" fill="none"/>
            
            <circle cx="100" cy="105" r="18" fill="#ef4444"/>
            <circle cx="100" cy="105" r="9" fill="#111111"/>
          </svg>
        </div>

        {/* ARCHITEC Text */}
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.2em] text-white uppercase leading-none mb-4">
            ARCHI<span className="font-bold text-red-600 tracking-wider">TEC</span>
          </h1>
          
          <div className="h-[1px] w-28 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent mb-4" />
          
          <p className="text-red-600/70 text-[10px] sm:text-xs tracking-[3px] uppercase font-medium">
            ARCHITECTURE REDEFINED
          </p>
        </div>

      </div>

      {/* Bottom Loading Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center w-full px-6">
        <div className="w-44 sm:w-52 h-px bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-red-600 animate-loading-bar" />
        </div>
        <span className="text-[9px] sm:text-[10px] text-zinc-500 tracking-widest mt-4">
          ESTABLISHING VISION
        </span>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2.3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;