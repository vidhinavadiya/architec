import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const contactImages = [
    "/images/View01.jpg", 
    "/images/home.jpg",
    "/images/VIEW_02.jpg"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contactImages.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(interval);
  }, [contactImages.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/user/contact/send", formData);
      setShowPopup(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />

    <section className="relative h-[60vh] flex items-center px-6 md:px-20 lg:px-32 border-b border-white/5 overflow-hidden">
        {contactImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Contact Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-30 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-[5000ms]`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-[1]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-[-5%] opacity-[0.03] select-none pointer-events-none z-[2]">
          <span className="text-[15rem] md:text-[25rem] font-bold tracking-tighter leading-none uppercase">
            Inquiry
          </span>
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-red-600 shadow-[0_0_10px_#ef4444]"></div>
            <p className="text-xs font-medium tracking-[0.5em] text-red-500 uppercase">Connect With Us</p>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
            START A <br />
            <span className="font-extralight italic text-zinc-500">CONVERSATION.</span>
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTACT AREA ================= */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-20">
          
          {/* Left Side: Contact Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-light tracking-tight italic">Office <span className="font-bold not-italic">Details</span></h2>
              <div className="w-16 h-[1px] bg-red-600 shadow-[0_0_10px_#ef4444]"></div>
            </div>

            <div className="space-y-12">
              <div className="group">
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-4 group-hover:text-red-500 transition-colors">Location</p>
                <p className="text-xl font-light leading-relaxed">Surat, Gujarat, India</p>
              </div>

              <div className="group">
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-4 group-hover:text-red-500 transition-colors">Digital</p>
                <a href="mailto:nd7046@gmail.com" className="text-xl font-light block hover:text-red-500 transition-colors">nd7046@gmail.com</a>
                <a href="tel:+919624038826" className="text-xl font-light block mt-2">+91 9624038826</a>
              </div>

              <div className="group">
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-4 group-hover:text-red-500 transition-colors">Follow</p>
                <div className="flex gap-6 text-sm tracking-widest uppercase">
                   <a href="#" className="hover:text-red-500 transition-colors">Instagram</a>
                   <a href="#" className="hover:text-red-500 transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Modern Form (8 Columns) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    placeholder="FULL NAME"
                    className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-red-600 transition-all placeholder:text-zinc-700 placeholder:text-xs placeholder:tracking-[0.3em]"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-red-600 transition-all placeholder:text-zinc-700 placeholder:text-xs placeholder:tracking-[0.3em]"
                  />
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="text" name="subject" required value={formData.subject} onChange={handleChange}
                  placeholder="SUBJECT / PROJECT TYPE"
                  className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-red-600 transition-all placeholder:text-zinc-700 placeholder:text-xs placeholder:tracking-[0.3em]"
                />
              </div>

              <div className="relative group">
                <textarea 
                  name="message" rows="4" required value={formData.message} onChange={handleChange}
                  placeholder="YOUR MESSAGE"
                  className="w-full bg-transparent border-b border-zinc-800 py-4 outline-none focus:border-red-600 transition-all resize-none placeholder:text-zinc-700 placeholder:text-xs placeholder:tracking-[0.3em]"
                ></textarea>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="group relative inline-flex items-center gap-6 border border-white/20 px-12 py-5 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.4em] text-xs font-light"
                >
                  Send Message
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= MAP PLACEHOLDER ================= */}
      <section className="h-[400px] w-full grayscale opacity-50 hover:opacity-100 transition-opacity duration-1000">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.54586616422!2d72.73989445941913!3d21.1591802034969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Surat Office"
          ></iframe>
      </section>

        {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
    
    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-center shadow-2xl w-[90%] max-w-md animate-fadeIn">

      {/* Icon */}
      <div className="flex justify-center mb-6">
  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10">
    <svg 
      className="w-10 h-10 text-green-500" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="1.5" 
        d="M5 13l4 4L19 7" 
      />
    </svg>
  </div>
</div>

      {/* Message */}
      <h2 className="text-xl font-semibold mb-2">
        Message Sent!
      </h2>
      <p className="text-zinc-400 text-sm">
        Thank you for contacting us. We will get back to you soon.
      </p>

      {/* Close Button */}
      <button
        onClick={() => setShowPopup(false)}
        className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm"
      >
        Close
      </button>
    </div>
  </div>
)}
      <Footer />
    </div>
  );
};

export default Contact;