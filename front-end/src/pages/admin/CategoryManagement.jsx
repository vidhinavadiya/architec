import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiX } from "react-icons/fi"; // Icons import karein

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search State
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/category/all");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Search Logic ---
  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.id.toString().includes(searchTerm)
  );

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: "", description: "" });
    setImageFile(null);
    setPreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ title: category.title, description: category.description || "" });
    setPreview(category.image ? `http://localhost:3000/uploads/categories/${category.image}` : null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (imageFile) form.append("image", imageFile);

    try {
      const url = editingId 
        ? `http://localhost:3000/api/admin/category/update/${editingId}`
        : "http://localhost:3000/api/admin/category/create";
      
      const method = editingId ? "put" : "post";

      await axios[method](url, form, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setSuccessMessage(editingId ? "Updated Successfully" : "Created Successfully");
      closeModal();
      fetchCategories();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert("Operation failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/category/delete/${categoryToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Deleted Successfully");
      fetchCategories();
      setIsDeleteModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <header className="px-10 py-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase italic">Categories</h1>
            <p className="text-zinc-500 text-xs tracking-[0.2em] mt-1 uppercase">Store / Management</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH BY ID OR NAME..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900/50 border border-white/10 rounded-full py-2.5 pl-12 pr-6 outline-none focus:border-red-600/50 transition-all text-xs tracking-widest w-[250px] lg:w-[350px]"
              />
            </div>

            <button 
              onClick={openAddModal}
              className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition-all duration-500 shadow-lg active:scale-90"
            >
              <FiPlus size={20} />
            </button>
          </div>
        </header>

        <main className="p-10">
          {successMessage && (
            <div className="mb-8 bg-red-600/10 border border-red-600/20 text-red-500 px-6 py-4 rounded-xl text-sm tracking-widest uppercase text-center animate-pulse">
              {successMessage}
            </div>
          )}

          {/* Table Style Categories */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCategories.map((cat) => (
              <div 
                key={cat.id} 
                className="group flex flex-col md:flex-row items-center gap-8 bg-zinc-900/30 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-red-600/30 transition-all duration-500"
              >
                {/* ID Badge */}
                <div className="text-zinc-700 font-mono text-xl group-hover:text-red-900 transition-colors">#{cat.id}</div>

                {/* Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                  <img 
                    src={cat.image ? `http://localhost:3000/uploads/categories/${cat.image}` : "/images/placeholder.jpg"} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={cat.title}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold tracking-tight uppercase">{cat.title}</h3>
<p className="text-zinc-500 text-sm line-clamp-1 font-normal mt-1 lowercase tracking-wide">
    {cat.description || "No description provided."}
  </p>                          </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(cat)}
                    className="p-4 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button 
                    onClick={() => { setCategoryToDelete(cat.id); setIsDeleteModalOpen(true); }}
                    className="p-4 bg-zinc-800 rounded-xl hover:bg-red-600 transition-all"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-20 text-zinc-600 tracking-[0.3em] uppercase italic">
              No results found for your search inquiry.
            </div>
          )}
        </main>
      </div>

      {/* --- Minimalist Add/Edit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter">
                  {editingId ? "Edit" : "New"} <span className="text-red-600">Category</span>
                </h2>
                <button onClick={closeModal} className="text-zinc-500 hover:text-white"><FiX size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Category Title</label>
                  <input 
                    type="text" required value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-red-600 transition-all text-xl font-light"
                    placeholder="E.G. RESIDENTIAL DESIGN"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Image Upload</label>
                  <input type="file" onChange={handleImageChange} className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700"/>
                  {preview && <img src={preview} className="mt-4 h-32 w-full object-cover rounded-xl border border-white/5" alt="Preview"/>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl p-4 outline-none focus:border-red-600 transition-all font-light text-zinc-400"
                    rows="4"
                  />
                </div>

                <button type="submit" className="w-full bg-white text-black py-5 uppercase tracking-[0.4em] font-bold hover:bg-red-600 hover:text-white transition-all duration-500">
                  {editingId ? "Save Changes" : "Create Category"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal - Minimal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-6">
          <div className="bg-zinc-950 border border-red-600/20 p-12 rounded-3xl max-w-sm text-center">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 italic">Confirm <span className="text-red-600">Delete?</span></h3>
            <p className="text-zinc-500 text-sm font-light mb-10 tracking-wide">Category #{categoryToDelete} will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 border border-white/10 py-4 uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 py-4 uppercase tracking-widest text-xs font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;