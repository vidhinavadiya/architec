import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiX, FiType, FiImage, FiMinusCircle } from "react-icons/fi";

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    subcategory_id: "",
    title: "",
    country: "",
    city: "",
    year: "",
    slug: "",
    typology: "",
    size: "",
    status: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [sections, setSections] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/plan/all");
      const subRes = await axios.get("http://localhost:3000/api/admin/subcategory/all");
      setPlans(res.data || []);
      setSubcategories(subRes.data.data || []);
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
  const filteredPlans = plans.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm)
  );

  // ================= MODAL CONTROLS =================
  const openModal = () => {
    setEditingId(null);
    setFormData({
      subcategory_id: "", title: "", country: "", city: "",
      year: "", slug: "", typology: "", size: "", status: ""
    });
    setSections([]);
    setIconFile(null);
    setIconPreview(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setFormData({
      subcategory_id: plan.subcategory_id,
      title: plan.title,
      country: plan.country,
      city: plan.city,
      year: plan.year,
      slug: plan.slug,
      typology: plan.typology,
      size: plan.size,
      status: plan.status
    });
    setSections(plan.sections.map(sec => ({ type: sec.type, content: sec.content, file: null })));
    setIconPreview(plan.icon ? `http://localhost:3000/uploads/icons/${plan.icon}` : null);
    setIsModalOpen(true);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  // ================= SECTION LOGIC =================
  const addSection = (type) => setSections([...sections, { type, content: "", file: null }]);
  
  const updateSection = (index, value, isFile = false) => {
    const updated = [...sections];
    if (isFile) {
      updated[index].file = value;
      updated[index].preview = URL.createObjectURL(value);
    } else {
      updated[index].content = value;
    }
    setSections(updated);
  };

  const deleteSection = (index) => setSections(sections.filter((_, i) => i !== index));

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => form.append(key, formData[key]));
    if (iconFile) form.append("icon", iconFile);

    sections.forEach(sec => {
      if (sec.type === "image" && sec.file) form.append("section_images", sec.file);
      if (sec.type === "text") form.append("section_text", sec.content);
    });

    try {
      const url = editingId 
        ? `http://localhost:3000/api/admin/plan/update/${editingId}`
        : "http://localhost:3000/api/admin/plan/create";
      
      const method = editingId ? "put" : "post";
      await axios[method](url, form, { headers: { Authorization: `Bearer ${token}` } });

      setSuccessMessage(editingId ? "Plan Restructured!" : "Plan Architected!");
      closeModal();
      fetchData();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      alert("Execution Failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/plan/delete/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage("Plan Deconstructed");
      fetchData();
      setIsDeleteModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      alert("Deconstruction Failed");
    }
  };

  if (loading) return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      <div className="flex-1 flex items-center justify-center italic tracking-widest text-zinc-500 uppercase font-light">Loading Blueprints...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-10 py-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase italic">Project<span className="text-red-600">Plans</span></h1>
            <p className="text-zinc-500 text-xs tracking-[0.2em] mt-1 uppercase">Technical / Documentation</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH PLANS, CITIES, IDS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900/50 border border-white/10 rounded-full py-2.5 pl-12 pr-6 outline-none focus:border-red-600/50 transition-all text-[10px] tracking-widest w-[250px] lg:w-[350px]"
              />
            </div>
            <button onClick={openModal} className="bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition-all duration-500 shadow-lg">
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

          {/* Table-like List for Plans */}
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="group flex flex-col md:flex-row items-center gap-8 bg-zinc-900/30 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-red-600/30 transition-all duration-500">
                <div className="text-zinc-700 font-mono text-lg group-hover:text-red-900 w-12 text-center">#{plan.id}</div>
                
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                  <img 
                    src={plan.icon ? `http://localhost:3000/uploads/icons/${plan.icon}` : "/images/placeholder.jpg"} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={plan.title}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold tracking-tight uppercase">{plan.title}</h3>
                    <span className="bg-white/5 text-zinc-400 text-[9px] px-3 py-1 rounded-full border border-white/10 tracking-[0.2em] uppercase font-bold">
                      {plan.city}, {plan.country}
                    </span>
                  </div>
                  <div className="text-zinc-500 text-sm line-clamp-1 font-normal mt-1 lowercase tracking-wide flex items-center gap-4">
  <span>Year: {plan.year}</span>
  <span className="w-1 h-1 bg-zinc-800 rounded-full"></span> {/* Optional: Chota dot separator */}
  <span>Typology: {plan.typology}</span>
  <span className="w-1 h-1 bg-zinc-800 rounded-full"></span> {/* Optional: Chota dot separator */}
  <span className="text-red-600/80 font-medium">{plan.size}</span>
</div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleEdit(plan)} className="p-4 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => { setDeleteId(plan.id); setIsDeleteModalOpen(true); }} className="p-4 bg-zinc-800 rounded-xl hover:bg-red-600 transition-all">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredPlans.length === 0 && (
            <div className="text-center py-20 text-zinc-600 tracking-[0.3em] uppercase italic">
              No results found for your search inquiry.
            </div>
          )}
        </main>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-4xl my-auto rounded-3xl shadow-2xl">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter">
                  {editingId ? "Refine" : "New"} <span className="text-red-600">Project</span>
                </h2>
                <button onClick={closeModal} className="text-zinc-500 hover:text-white"><FiX size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Title & Slug */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Project Title</label>
                        <input type="text" required value={formData.title} onChange={(e)=>setFormData({...formData, title:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="PROJECT NAME"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">URL Slug</label>
                        <input type="text" required value={formData.slug} onChange={(e)=>setFormData({...formData, slug:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="project-url-path"/>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                       <div className="space-y-1">
                        <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">City</label>
                        <input type="text" value={formData.city} onChange={(e)=>setFormData({...formData, city:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="CITY"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Country</label>
                        <input type="text" value={formData.country} onChange={(e)=>setFormData({...formData, country:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="COUNTRY"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Year</label>
                        <input type="text" value={formData.year} onChange={(e)=>setFormData({...formData, year:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="2026"/>
                      </div>
                    </div>
                  </div>

                  {/* Icon Upload Area */}
                  <div className="bg-zinc-900/50 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                    {iconPreview ? (
                      <img src={iconPreview} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    ) : <FiImage className="text-zinc-700 mb-2" size={30}/>}
                    <input type="file" onChange={handleIconChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <span className="text-[8px] tracking-[0.2em] uppercase font-bold relative z-20">{iconPreview ? "Change Cover" : "Upload Cover"}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Typology</label>
                    <input type="text" value={formData.typology} onChange={(e)=>setFormData({...formData, typology:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="RESIDENTIAL"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Size / Area</label>
                    <input type="text" value={formData.size} onChange={(e)=>setFormData({...formData, size:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="1200 SQFT"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Status</label>
                    <input type="text" value={formData.status} onChange={(e)=>setFormData({...formData, status:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm" placeholder="COMPLETED"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase font-bold">Sub-Tier</label>
                    <select value={formData.subcategory_id} onChange={(e)=>setFormData({...formData, subcategory_id:e.target.value})} className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-all text-sm uppercase appearance-none cursor-pointer">
                      <option className="bg-zinc-950" value="">Select Tier...</option>
                      {subcategories.map(s => <option key={s.id} className="bg-zinc-950" value={s.id}>{s.title}</option>)}
                    </select>
                  </div>
                </div>

                {/* DYNAMIC SECTIONS AREA */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[10px] tracking-[0.5em] uppercase text-red-600 font-black italic">Content Sections</h3>
                    <div className="flex gap-2">
                      <button type="button" onClick={()=>addSection("text")} className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-full text-[9px] hover:bg-white hover:text-black transition-all uppercase tracking-widest"><FiType/> Add Text</button>
                      <button type="button" onClick={()=>addSection("image")} className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-full text-[9px] hover:bg-white hover:text-black transition-all uppercase tracking-widest"><FiImage/> Add Visual</button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                    {sections.map((sec, index) => (
                      <div key={index} className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl flex gap-4 items-start relative group">
                        <div className="bg-zinc-800 p-2 rounded-lg text-red-600">{sec.type === 'text' ? <FiType/> : <FiImage/>}</div>
                        <div className="flex-1">
                          {sec.type === "text" ? (
                            <textarea value={sec.content} onChange={(e)=>updateSection(index, e.target.value)} placeholder="ENTER TECHNICAL DESCRIPTION..." className="w-full bg-transparent outline-none text-sm font-light text-zinc-400 min-h-[80px]" />
                          ) : (
                            <div className="space-y-4">
                              <input type="file" onChange={(e)=>updateSection(index, e.target.files[0], true)} className="text-[10px] text-zinc-500" />
                              {(sec.preview || sec.content) && (
                                <img src={sec.preview || `http://localhost:3000/uploads/sections/${sec.content}`} className="h-32 w-full object-cover rounded-xl border border-white/5" alt="Section" />
                              )}
                            </div>
                          )}
                        </div>
                        <button type="button" onClick={()=>deleteSection(index)} className="text-zinc-700 hover:text-red-600 transition-colors"><FiMinusCircle size={20}/></button>
                      </div>
                    ))}
                    {sections.length === 0 && <p className="text-center py-10 text-zinc-800 text-[10px] uppercase tracking-[0.5em] italic">No sections defined in this blueprint.</p>}
                  </div>
                </div>

                <button type="submit" className="w-full bg-white text-black py-5 uppercase tracking-[0.4em] font-bold hover:bg-red-600 hover:text-white transition-all duration-500 active:scale-[0.98]">
                  {editingId ? "Update Plan" : "Finalize Blueprint"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL (Same as SubCategory) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-6">
          <div className="bg-zinc-950 border border-red-600/20 p-12 rounded-3xl max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 italic">Deconstruct <span className="text-red-600">Plan?</span></h3>
            <p className="text-zinc-500 text-sm font-light mb-10 tracking-wide">Plan ID #{deleteId} will be permanently removed from the project library.</p>
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

export default PlanManagement;