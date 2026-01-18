// import { useEffect, useState } from 'react';
// import { Trash2, Plus, Image, Feather, Loader2 } from 'lucide-react';
// import api from '../../services/api';

// const ManageZone = () => {
//     const [items, setItems] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [formData, setFormData] = useState({
//         type: 'photo',
//         title: '',
//         content: '',
//         description: ''
//     });

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const res = await api.get('/zone');
//             setItems(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await api.post('/zone', formData);
//             setFormData({ type: 'photo', title: '', content: '', description: '' }); // Reset
//             fetchItems(); // Refresh list
//             alert('Item added successfully!');
//         } catch (error) {
//             alert('Failed to add item');
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (!window.confirm("Delete this item?")) return;
//         try {
//             await api.delete(`/zone/${id}`);
//             fetchItems();
//         } catch (error) {
//             alert('Failed to delete');
//         }
//     };

//     return (
//         <div className="space-y-8">
//             <h1 className="text-3xl font-bold text-white mb-6">Manage My Zone</h1>

//             {/* ADD FORM */}
//             <div className="glass-card p-6">
//                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                     <Plus className="text-neon-purple" /> Add New Creation
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="text-gray-400 text-sm block mb-1">Type</label>
//                             <select
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                                 value={formData.type}
//                                 onChange={e => setFormData({ ...formData, type: e.target.value })}
//                             >
//                                 <option value="photo">Photo Gallery</option>
//                                 <option value="poem">Poetry / Musing</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-gray-400 text-sm block mb-1">Title</label>
//                             <input
//                                 type="text"
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                                 value={formData.title}
//                                 onChange={e => setFormData({ ...formData, title: e.target.value })}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="text-gray-400 text-sm block mb-1">
//                             {formData.type === 'photo' ? 'Image URL (Google Drive Link)' : 'Poem Content'}
//                         </label>
//                         {formData.type === 'photo' ? (
//                             <input
//                                 type="text"
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                                 value={formData.content}
//                                 onChange={e => setFormData({ ...formData, content: e.target.value })}
//                                 placeholder="Paste Google Drive Link here..."
//                                 required
//                             />
//                         ) : (
//                             <textarea
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white h-32 font-mono"
//                                 value={formData.content}
//                                 onChange={e => setFormData({ ...formData, content: e.target.value })}
//                                 placeholder="Write your poem here..."
//                                 required
//                             />
//                         )}
//                     </div>

//                     <div>
//                         <label className="text-gray-400 text-sm block mb-1">Description (Optional)</label>
//                         <input
//                             type="text"
//                             className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                             value={formData.description}
//                             onChange={e => setFormData({ ...formData, description: e.target.value })}
//                         />
//                     </div>

//                     <button type="submit" className="btn-neon w-full py-2 font-bold">
//                         Add to Zone
//                     </button>
//                 </form>
//             </div>

//             {/* LIST ITEMS */}
//             <div className="glass-card p-6">
//                 <h2 className="text-xl font-bold text-white mb-4">Existing Items</h2>
//                 {loading ? <Loader2 className="animate-spin text-white" /> : (
//                     <div className="space-y-4">
//                         {items.map((item) => (
//                             <div key={item._id} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5 hover:border-white/20">
//                                 <div className="flex items-center gap-3">
//                                     <div className={`p-2 rounded ${item.type === 'photo' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
//                                         {item.type === 'photo' ? <Image size={18} /> : <Feather size={18} />}
//                                     </div>
//                                     <div>
//                                         <h4 className="text-white font-bold text-sm">{item.title}</h4>
//                                         <p className="text-gray-500 text-xs truncate max-w-[200px]">{item.description || "No description"}</p>
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => handleDelete(item._id)}
//                                     className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
//                                 >
//                                     <Trash2 size={18} />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageZone;

// import { useEffect, useState } from 'react';
// import { Trash2, Plus, Image, Feather, Loader2, UploadCloud } from 'lucide-react'; // Added UploadCloud
// import api from '../../services/api';

// const ManageZone = () => {
//     const [items, setItems] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     // Form State
//     const [type, setType] = useState('photo');
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState(''); // For Poems
//     const [file, setFile] = useState<File | null>(null); // For Photos
//     const [description, setDescription] = useState('');
//     const [uploading, setUploading] = useState(false); // Loading state for upload

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const res = await api.get('/zone');
//             setItems(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     setUploading(true);

//     //     // ✅ Create FormData object for file upload
//     //     const formData = new FormData();
//     //     formData.append('type', type);
//     //     formData.append('title', title);
//     //     formData.append('description', description);

//     //     if (type === 'photo' && file) {
//     //         formData.append('image', file); // 'image' matches the backend upload.single('image')
//     //     } else {
//     //         formData.append('content', content); // For poems
//     //     }

//     //     try {
//     //         // Note: When sending FormData, axios sets 'Content-Type': 'multipart/form-data' automatically
//     //         await api.post('/zone', formData);

//     //         // Reset Form
//     //         setTitle('');
//     //         setContent('');
//     //         setFile(null);
//     //         setDescription('');

//     //         fetchItems();
//     //         alert('Item added successfully!');
//     //     } catch (error) {
//     //         console.error(error);
//     //         alert('Failed to add item');
//     //     } finally {
//     //         setUploading(false);
//     //     }
//     // };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setUploading(true);

//         const formData = new FormData();
//         formData.append('type', type);
//         formData.append('title', title);
//         formData.append('description', description);

//         // Append content based on type
//         if (type === 'photo' && file) {
//             formData.append('image', file); // Must match backend upload.single('image')
//         } else {
//             formData.append('content', content);
//         }

//         try {
//             // ✅ FIX: Explicitly set header to multipart/form-data
//             await api.post('/zone', formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             // Reset Form
//             setTitle('');
//             setContent('');
//             setFile(null);
//             setDescription('');

//             fetchItems();
//             alert('Item added successfully!');
//         } catch (error) {
//             console.error(error);
//             alert('Failed to add item');
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (!window.confirm("Delete this item?")) return;
//         try {
//             await api.delete(`/zone/${id}`);
//             fetchItems();
//         } catch (error) {
//             alert('Failed to delete');
//         }
//     };

//     return (
//         <div className="space-y-8">
//             <h1 className="text-3xl font-bold text-white mb-6">Manage My Zone</h1>

//             {/* ADD FORM */}
//             <div className="glass-card p-6">
//                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                     <Plus className="text-neon-purple" /> Add New Creation
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="text-gray-400 text-sm block mb-1">Type</label>
//                             <select
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                                 value={type}
//                                 onChange={e => setType(e.target.value)}
//                             >
//                                 <option value="photo">Photo Gallery</option>
//                                 <option value="poem">Poetry / Musing</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-gray-400 text-sm block mb-1">Title</label>
//                             <input
//                                 type="text"
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                                 value={title}
//                                 onChange={e => setTitle(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="text-gray-400 text-sm block mb-1">
//                             {type === 'photo' ? 'Upload Photo' : 'Poem Content'}
//                         </label>

//                         {type === 'photo' ? (
//                             // ✅ FILE INPUT FOR PHOTOS
//                             <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-neon-purple transition-colors text-center cursor-pointer">
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                     onChange={(e) => {
//                                         if (e.target.files && e.target.files[0]) {
//                                             setFile(e.target.files[0]);
//                                         }
//                                     }}
//                                     required={!file} // Required only if no file selected yet
//                                 />
//                                 <div className="flex flex-col items-center gap-2 pointer-events-none">
//                                     <UploadCloud className="text-neon-purple" size={32} />
//                                     <span className="text-sm text-gray-300">
//                                         {file ? file.name : "Click or Drag to Upload Image"}
//                                     </span>
//                                 </div>
//                             </div>
//                         ) : (
//                             // TEXTAREA FOR POEMS
//                             <textarea
//                                 className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white h-32 font-mono"
//                                 value={content}
//                                 onChange={e => setContent(e.target.value)}
//                                 placeholder="Write your poem here..."
//                                 required
//                             />
//                         )}
//                     </div>

//                     <div>
//                         <label className="text-gray-400 text-sm block mb-1">Description (Optional)</label>
//                         <input
//                             type="text"
//                             className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
//                             value={description}
//                             onChange={e => setDescription(e.target.value)}
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={uploading}
//                         className="btn-neon w-full py-2 font-bold flex items-center justify-center gap-2"
//                     >
//                         {uploading ? (
//                             <>Uploading <Loader2 className="animate-spin" size={18} /></>
//                         ) : (
//                             "Add to Zone"
//                         )}
//                     </button>
//                 </form>
//             </div>

//             {/* LIST ITEMS */}
//             <div className="glass-card p-6">
//                 <h2 className="text-xl font-bold text-white mb-4">Existing Items</h2>
//                 {loading ? <Loader2 className="animate-spin text-white" /> : (
//                     <div className="space-y-4">
//                         {items.map((item) => (
//                             <div key={item._id} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5 hover:border-white/20">
//                                 <div className="flex items-center gap-3">
//                                     <div className={`p-2 rounded ${item.type === 'photo' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
//                                         {item.type === 'photo' ? <Image size={18} /> : <Feather size={18} />}
//                                     </div>
//                                     <div className="overflow-hidden">
//                                         <h4 className="text-white font-bold text-sm truncate">{item.title}</h4>
//                                         <p className="text-gray-500 text-xs truncate max-w-[200px]">
//                                             {item.type === 'photo' ? 'Image File' : item.content.substring(0, 30) + '...'}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => handleDelete(item._id)}
//                                     className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors shrink-0"
//                                 >
//                                     <Trash2 size={18} />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageZone;

import { useEffect, useState } from 'react';
import { Trash2, Plus, Image, Feather, Loader2, UploadCloud, Edit2, X } from 'lucide-react';
import api from '../../services/api';

const ManageZone = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [type, setType] = useState('photo');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // For Poems
    const [file, setFile] = useState<File | null>(null); // For Photos
    const [description, setDescription] = useState('');

    const [uploading, setUploading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null); // ✅ Track which item we are editing

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await api.get('/zone');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Populate form when Edit is clicked
    const handleEdit = (item: any) => {
        setEditingId(item._id);
        setType(item.type);
        setTitle(item.title);
        setDescription(item.description || '');

        if (item.type === 'poem') {
            setContent(item.content);
        } else {
            // For photos, we reset file input (user can choose to upload new one or keep old)
            setFile(null);
        }

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ✅ Cancel Edit Mode
    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setContent('');
        setFile(null);
        setDescription('');
        setType('photo');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        formData.append('type', type);
        formData.append('title', title);
        formData.append('description', description);

        // Append content based on type
        if (type === 'photo' && file) {
            formData.append('image', file);
        } else {
            formData.append('content', content);
        }

        try {
            if (editingId) {
                // ✅ UPDATE EXISTING ITEM
                await api.put(`/zone/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert('Item updated successfully!');
            } else {
                // ✅ CREATE NEW ITEM
                await api.post('/zone', formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert('Item added successfully!');
            }

            resetForm();
            fetchItems();
        } catch (error) {
            console.error(error);
            alert('Failed to save item');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this item?")) return;
        try {
            await api.delete(`/zone/${id}`);
            fetchItems();
            if (editingId === id) resetForm(); // If deleting the item currently being edited
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white mb-6">Manage My Zone</h1>

            {/* FORM SECTION */}
            <div className={`glass-card p-6 border-l-4 ${editingId ? 'border-l-neon-blue' : 'border-l-neon-purple'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {editingId ? (
                            <><Edit2 className="text-neon-blue" /> Edit Creation</>
                        ) : (
                            <><Plus className="text-neon-purple" /> Add New Creation</>
                        )}
                    </h2>

                    {/* Cancel Button */}
                    {editingId && (
                        <button onClick={resetForm} className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                            <X size={16} /> Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">Type</label>
                            <select
                                className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
                                value={type}
                                onChange={e => setType(e.target.value)}
                            >
                                <option value="photo">Photo Gallery</option>
                                <option value="poem">Poetry / Musing</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm block mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-400 text-sm block mb-1">
                            {type === 'photo' ? 'Upload Photo' : 'Poem Content'}
                        </label>

                        {type === 'photo' ? (
                            <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-neon-purple transition-colors text-center cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                    // Required ONLY if adding new, or if user wants to replace logic manually
                                    // But typically for update we allow keeping old file.
                                    required={!editingId && !file}
                                />
                                <div className="flex flex-col items-center gap-2 pointer-events-none">
                                    <UploadCloud className="text-neon-purple" size={32} />
                                    <span className="text-sm text-gray-300">
                                        {file ? file.name : (editingId ? "Click to Replace Image (Optional)" : "Click or Drag to Upload Image")}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white h-32 font-mono"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Write your poem here..."
                                required
                            />
                        )}
                    </div>

                    <div>
                        <label className="text-gray-400 text-sm block mb-1">Description (Optional)</label>
                        <input
                            type="text"
                            className="w-full bg-dark-200 border border-white/10 rounded p-2 text-white"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className={`w-full py-2 font-bold flex items-center justify-center gap-2 rounded transition-colors ${editingId
                                ? 'bg-neon-blue text-dark hover:bg-cyan-400'
                                : 'btn-neon'
                            }`}
                    >
                        {uploading ? (
                            <>Processing <Loader2 className="animate-spin" size={18} /></>
                        ) : (
                            editingId ? "Update Item" : "Add to Zone"
                        )}
                    </button>
                </form>
            </div>

            {/* LIST ITEMS */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Existing Items</h2>
                {loading ? <Loader2 className="animate-spin text-white" /> : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item._id} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5 hover:border-white/20">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`p-2 rounded shrink-0 ${item.type === 'photo' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                        {item.type === 'photo' ? <Image size={18} /> : <Feather size={18} />}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-white font-bold text-sm truncate">{item.title}</h4>
                                        <p className="text-gray-500 text-xs truncate">
                                            {item.description || (item.type === 'poem' ? item.content.substring(0, 30) : 'No description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    {/* ✅ EDIT BUTTON */}
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageZone;