import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiX } from "react-icons/fi"; // Make sure to install react-icons

const SubCategoryManagement = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const subRes = await axios.get("http://localhost:3000/api/admin/subcategory/all");
      const catRes = await axios.get("http://localhost:3000/api/admin/category/all");

      setSubcategories(subRes.data.data || []);
      setCategories(catRes.data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Search Logic ---
  const filteredSubCats = subcategories.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm) ||
    item.category?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", categoryId: "" });
    setImageFile(null);
    setPreview(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setPreview(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description || "",
      categoryId: item.categoryId
    });
    setPreview(item.image ? `http://localhost:3000/uploads/subcategories/${item.image}` : null);
    setIsModalOpen(true);
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
    if (!formData.categoryId) return alert("Please select category");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("categoryId", formData.categoryId);
    if (imageFile) form.append("image", imageFile);

    try {
      const url = editingId 
        ? `http://localhost:3000/api/admin/subcategory/update/${editingId}`
        : "http://localhost:3000/api/admin/subcategory/create";
      
      const method = editingId ? "put" : "post";

      await axios[method](url, form, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setSuccessMessage(editingId ? "SubCategory Updated!" : "SubCategory Created!");
      closeModal();
      fetchData();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert("Operation failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/subcategory/delete/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage("Deleted successfully");
      fetchData();
      setIsDeleteModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      <div className="flex-1 flex items-center justify-center italic tracking-widest text-zinc-500 uppercase">Loading Subcategories...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <header className="px-10 py-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase italic">Sub<span className="text-red-600">Categories</span></h1>
            <p className="text-zinc-500 text-xs tracking-[0.2em] mt-1 uppercase">Hierarchy / Management</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH BY NAME, ID OR PARENT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900/50 border border-white/10 rounded-full py-2.5 pl-12 pr-6 outline-none focus:border-red-600/50 transition-all text-[10px] tracking-widest w-[250px] lg:w-[350px]"
              />
            </div>
            <button onClick={openModal} className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition-all duration-500 shadow-lg active:scale-90">
              <FiPlus size={20} />
            </button>
          </div>
        </header>

        <main className="p-10">
          {successMessage && (
            <div className="mb-8 bg-red-600/10 border border-red-600/20 text-red-500 px-6 py-4 rounded-xl text-xs tracking-widest uppercase text-center animate-pulse">
              {successMessage}
            </div>
          )}

          {/* List Section */}
          <div className="space-y-4">
            {filteredSubCats.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col md:flex-row items-center gap-8 bg-zinc-900/30 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-red-600/30 transition-all duration-500"
              >
                {/* ID */}
                <div className="text-zinc-700 font-mono text-lg group-hover:text-red-900 transition-colors w-12 text-center">#{item.id}</div>

                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                  <img 
                    src={item.image ? `http://localhost:3000/uploads/subcategories/${item.image}` : "/images/placeholder.jpg"} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={item.title}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold tracking-tight uppercase">{item.title}</h3>
                    <span className="bg-red-600/10 text-red-500 text-[9px] px-3 py-1 rounded-full border border-red-600/20 tracking-[0.2em] uppercase font-bold">
                      {item.category?.title || "No Category"}
                    </span>
                  </div>
                <p className="text-zinc-500 text-sm line-clamp-1 font-normal mt-1 lowercase tracking-wide">
    {item.description || "Architectural details pending..."}
  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(item)} className="p-4 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all" title="Edit">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => { setDeleteId(item.id); setIsDeleteModalOpen(true); }} className="p-4 bg-zinc-800 rounded-xl hover:bg-red-600 transition-all" title="Delete">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSubCats.length === 0 && (
            <div className="text-center py-20 text-zinc-600 tracking-[0.3em] uppercase italic text-sm">
              No results found for your search inquiry.
            </div>
          )}
        </main>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter">
                  {editingId ? "Refine" : "New"} <span className="text-red-600">Sub-Tier</span>
                </h2>
                <button onClick={closeModal} className="text-zinc-500 hover:text-white"><FiX size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Label</label>
                    <input 
                      type="text" required value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-red-600 transition-all text-lg font-light"
                      placeholder="E.G. BRUTALIST"
                    />
                  </div>

                  {/* Category Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Parent Category</label>
                    <select 
                      value={formData.categoryId}
                      onChange={(e)=>setFormData({...formData, categoryId:e.target.value})}
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-red-600 transition-all text-sm tracking-widest uppercase appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-zinc-950">Select Parent...</option>
                      {categories.map(cat=>(
                        <option key={cat.id} value={cat.id} className="bg-zinc-950 uppercase">{cat.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Thumbnail</label>
                  <input type="file" onChange={handleImageChange} className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:font-bold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-red-600 hover:file:text-white transition-all"/>
                  {preview && <img src={preview} className="mt-4 h-32 w-full object-cover rounded-xl border border-white/5 shadow-lg" alt="Preview"/>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Detail Summary</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-900/30 border border-white/5 rounded-2xl p-4 outline-none focus:border-red-600 transition-all font-light text-zinc-400 text-sm"
                    rows="3"
                    placeholder="Describe the architectural sub-element..."
                  />
                </div>

                <button type="submit" className="w-full bg-white text-black py-5 uppercase tracking-[0.4em] font-bold hover:bg-red-600 hover:text-white transition-all duration-500 active:scale-[0.98]">
                  {editingId ? "Update SubCategory" : "Finalize Creation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-6">
          <div className="bg-zinc-950 border border-red-600/20 p-12 rounded-3xl max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 italic">Deconstruct <span className="text-red-600">Sub-Tier?</span></h3>
            <p className="text-zinc-500 text-sm font-light mb-10 tracking-wide">ID #{deleteId} will be permanently removed from the architecture.</p>
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

export default SubCategoryManagement;