import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { FiTrash2, FiSearch, FiEye, FiX, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const token = localStorage.getItem("adminToken");

  // ================= FETCH =================
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/contact/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // --- Search Logic ---
  const filteredContacts = contacts.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= ACTIONS =================
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/user/contact/delete/${contactToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Inquiry Purged Successfully");
      fetchContacts();
      setIsDeleteModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert("Purge failed");
    }
  };

  if (loading) return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      <div className="flex-1 flex items-center justify-center italic tracking-widest text-zinc-500 uppercase font-light">Loading Communication Logs...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header Section (Plan Page Style) */}
        <header className="px-10 py-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase italic">User<span className="text-red-600">Inquiries</span></h1>
            <p className="text-zinc-500 text-xs tracking-[0.2em] mt-1 uppercase">Communication / CRM</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH BY NAME, EMAIL OR SUBJECT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900/50 border border-white/10 rounded-full py-2.5 pl-12 pr-6 outline-none focus:border-red-600/50 transition-all text-[10px] tracking-widest w-[250px] lg:w-[350px]"
              />
            </div>
          </div>
        </header>

        <main className="p-10">
          {successMessage && (
            <div className="mb-8 bg-red-600/10 border border-red-600/20 text-red-500 px-6 py-4 rounded-xl text-xs tracking-widest uppercase text-center animate-pulse">
              {successMessage}
            </div>
          )}

          {/* List Section (Plan Row Style) */}
          <div className="space-y-4">
            {filteredContacts.map((msg) => (
              <div 
                key={msg.id} 
                className="group flex flex-col md:flex-row items-center gap-8 bg-zinc-900/30 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-red-600/30 transition-all duration-500"
              >
                {/* Visual Icon */}
                <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-all">
                  <FiMessageSquare className="text-zinc-600 group-hover:text-red-600 transition-colors" size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold tracking-tight uppercase">{msg.name}</h3>
                    <span className="bg-white/5 text-zinc-500 text-[9px] px-3 py-1 rounded-full border border-white/10 tracking-[0.2em] uppercase font-bold">
                      {msg.email}
                    </span>
                  </div>
                  <p className="text-red-600 text-[10px] tracking-[0.2em] mt-1 font-black uppercase italic">{msg.subject}</p>
                  <p className="text-zinc-500 text-sm line-clamp-1 font-normal mt-1 lowercase tracking-wide flex items-center gap-4">{msg.message}</p>
                </div>

                {/* Date */}
                <div className="hidden lg:block text-right px-6 border-r border-white/5">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Received On</p>
                  <p className="text-xs font-mono text-zinc-400">{new Date(msg.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => { setSelectedMessage(msg); setIsViewModalOpen(true); }} 
                    className="p-4 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
                    title="Examine"
                  >
                    <FiEye size={16} />
                  </button>
                  <button 
                    onClick={() => { setContactToDelete(msg.id); setIsDeleteModalOpen(true); }} 
                    className="p-4 bg-zinc-800 rounded-xl hover:bg-red-600 transition-all"
                    title="Purge"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {filteredContacts.length === 0 && (
              <div className="text-center py-20 text-zinc-600 tracking-[0.3em] uppercase italic text-sm">
                No archived messages match your inquiry.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- VIEW MODAL (Plan Modal Style) --- */}
      {isViewModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter">
                  Message <span className="text-red-600">Details</span>
                </h2>
                <button onClick={() => setIsViewModalOpen(false)} className="text-zinc-500 hover:text-white"><FiX size={24}/></button>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Sender Name</label>
                    <p className="text-lg font-light text-white tracking-wide">{selectedMessage.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Electronic Mail</label>
                    <p className="text-lg font-light text-red-600 lowercase">{selectedMessage.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Inquiry Subject</label>
                  <p className="text-sm tracking-widest uppercase text-zinc-300 font-bold">{selectedMessage.subject}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Message Content</label>
                  <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 font-light text-zinc-400 text-sm leading-relaxed italic">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Timestamp: {new Date(selectedMessage.createdAt).toLocaleString()}</div>
                    <button 
                        onClick={() => setIsViewModalOpen(false)} 
                        className="bg-white text-black px-8 py-3 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-red-600 hover:text-white transition-all duration-500"
                    >
                        Close Portal
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-6">
          <div className="bg-zinc-950 border border-red-600/20 p-12 rounded-3xl max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 italic">Purge <span className="text-red-600">Communication?</span></h3>
            <p className="text-zinc-500 text-sm font-light mb-10 tracking-wide">This inquiry will be permanently deleted from the architectural records.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 border border-white/10 py-4 uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-all">Abort</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-red-700 transition-all">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;