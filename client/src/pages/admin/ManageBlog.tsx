import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, FileText, Calendar } from 'lucide-react';
import api from '../../services/api';
import type { BlogPost } from '../../services/blogService';
import BlogForm from '../../components/admin/BlogForm';

const ManageBlog = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

    // Fetch blogs on load
    const fetchBlogs = async () => {
        try {
            const { data } = await api.get('/blogs');
            setBlogs(data);
        } catch (error) {
            console.error("Failed to load blogs", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Handle Create or Update
    const handleSave = async (blogData: any) => {
        if (editingBlog) {
            // Update existing
            await api.put(`/blogs/${editingBlog._id}`, blogData);
        } else {
            // Create new
            await api.post('/blogs', blogData);
        }
        setIsFormOpen(false);
        setEditingBlog(null);
        fetchBlogs();
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            await api.delete(`/blogs/${id}`);
            fetchBlogs();
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Blog Posts</h1>
                    <p className="text-gray-400 mt-1">Create, edit, and manage your articles.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingBlog(null);
                        setIsFormOpen(true);
                    }}
                    className="btn-neon flex items-center gap-2 bg-gradient-to-r from-neon-purple to-pink-600 border-none"
                >
                    <Plus size={20} /> Write New Article
                </button>
            </div>

            {/* Blog List Grid */}
            <div className="grid grid-cols-1 gap-4">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="glass-card p-5 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-neon-purple/50 transition-all"
                    >
                        {/* Left: Icon or Image Thumbnail */}
                        <div className="w-16 h-16 rounded-lg bg-dark-200 flex items-center justify-center shrink-0 overflow-hidden border border-white/5">
                            {blog.coverImage ? (
                                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                                <FileText className="text-gray-600" size={24} />
                            )}
                        </div>

                        {/* Middle: Content Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-mono text-neon-purple bg-neon-purple/10 px-2 py-0.5 rounded">
                                    {blog.tags[0] || 'General'}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-neon-purple transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-1 mt-1">
                                {blog.description}
                            </p>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 self-end md:self-center">
                            <button
                                onClick={() => {
                                    setEditingBlog(blog);
                                    setIsFormOpen(true);
                                }}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                title="Edit Article"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                title="Delete Article"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {blogs.length === 0 && (
                    <div className="text-center py-16 bg-white/5 rounded-xl border border-white/5 border-dashed">
                        <FileText className="mx-auto text-gray-600 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-300">No articles yet</h3>
                        <p className="text-gray-500 mt-2 mb-6">Start sharing your knowledge by creating your first post.</p>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="text-neon-purple hover:underline"
                        >
                            Create Post Now
                        </button>
                    </div>
                )}
            </div>

            {/* Blog Editor Modal */}
            {isFormOpen && (
                <BlogForm
                    initialData={editingBlog}
                    onSubmit={handleSave}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingBlog(null);
                    }}
                />
            )}
        </div>
    );
};

export default ManageBlog;