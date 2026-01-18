import { useState, useEffect } from 'react';
import { X, Save, Loader2, Image as ImageIcon, Tag } from 'lucide-react';
import type { BlogPost } from '../../services/blogService';

interface Props {
    initialData?: BlogPost | null;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}

const BlogForm = ({ initialData, onSubmit, onCancel }: Props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        coverImage: '',
        tags: '',
        readTime: '5 min read'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                content: initialData.content,
                coverImage: initialData.coverImage || '',
                tags: initialData.tags.join(', '), // Convert array to string
                readTime: initialData.readTime || '5 min read'
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Convert comma-separated tags back to array
            const formattedData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            };
            await onSubmit(formattedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 border-neon-purple/30 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">
                        {initialData ? 'Edit Article' : 'Write New Article'}
                    </h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Top Row: Title & Read Time */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3">
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-dark/50 border border-white/10 rounded p-3 text-lg font-bold focus:border-neon-purple outline-none text-white"
                                placeholder="How to build a MERN Stack App..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Read Time</label>
                            <input
                                type="text"
                                className="w-full bg-dark/50 border border-white/10 rounded p-3 focus:border-neon-purple outline-none text-white"
                                placeholder="5 min read"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Short Description (SEO & Preview)</label>
                        <textarea
                            required
                            rows={2}
                            className="w-full bg-dark/50 border border-white/10 rounded p-3 focus:border-neon-purple outline-none text-white resize-none"
                            placeholder="A brief summary of what this article is about..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Image & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                                <ImageIcon size={14} /> Cover Image URL
                            </label>
                            <input
                                type="text"
                                className="w-full bg-dark/50 border border-white/10 rounded p-3 focus:border-neon-purple outline-none text-white"
                                placeholder="https://..."
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                                <Tag size={14} /> Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                className="w-full bg-dark/50 border border-white/10 rounded p-3 focus:border-neon-purple outline-none text-white"
                                placeholder="React, Tutorial, Guide"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Main Content (Markdown) */}
                    <div className="flex-1">
                        <label className="block text-sm text-neon-blue mb-1 font-mono">Markdown Content</label>
                        <textarea
                            required
                            rows={15}
                            className="w-full bg-dark-200/50 border border-white/10 rounded p-4 font-mono text-sm leading-relaxed focus:border-neon-purple outline-none text-gray-200"
                            placeholder="# Introduction&#10;Write your article content here using Markdown..."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-2 text-right">
                            Supports Markdown: **bold**, # headings, [links](url), etc.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-neon-purple to-pink-600 rounded-lg text-white font-bold hover:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all flex items-center gap-2"
                        >
                            {loading && <Loader2 className="animate-spin" size={18} />}
                            {initialData ? 'Update Post' : 'Publish Post'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BlogForm;