import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 - Company Name */}
        <div>
          <h3 className="font-playfair text-3xl mb-4 text-white">
            ArchiTec
          </h3>
          <p className="text-gray-400">
            Crafting timeless architecture with vision and precision since 2018.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="uppercase tracking-wider mb-4 text-white">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/home" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 - Services */}
        <div>
          <h4 className="uppercase tracking-wider mb-4 text-white">
            Services
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li>Residential Design</li>
            <li>Commercial Projects</li>
            <li>Interior Design</li>
            <li>Landscape Architecture</li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h4 className="uppercase tracking-wider mb-4 text-white">
            Contact
          </h4>
          <div className="space-y-2 text-gray-400">
            <p>Surat, Gujarat</p>
            <p>nd7046@gmail.com</p>
            <p>+91 9624038826</p>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} ArchiTec. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;