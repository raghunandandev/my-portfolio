import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import type{ Project } from '../../services/projectService';

interface Props {
    initialData?: Project | null;
    onSubmit: (data: Partial<Project>) => Promise<void>;
    onCancel: () => void;
}

const ProjectForm = ({ initialData, onSubmit, onCancel }: Props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        liveLink: '',
        githubLink: '',
        imageUrl: '',
        category: 'Web App',
        featured: false,
    });
    const [loading, setLoading] = useState(false);

    // Load data if editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                techStack: initialData.techStack.join(', '), // Convert array to string for input
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                techStack: formData.techStack.split(',').map((t) => t.trim()), // Convert back to array
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border-neon-blue/30">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {initialData ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Category</label>
                            <select
                                className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Web App</option>
                                <option>Mobile App</option>
                                <option>Design</option>
                                <option>Algorithm</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Tech Stack (comma separated)</label>
                        <input
                            type="text"
                            placeholder="React, Node.js, MongoDB"
                            className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                            value={formData.techStack}
                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Live Link</label>
                            <input
                                type="url"
                                className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                                value={formData.liveLink}
                                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">GitHub Link</label>
                            <input
                                type="url"
                                className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                                value={formData.githubLink}
                                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                        <input
                            type="text"
                            placeholder="https://..."
                            className="w-full bg-dark/50 border border-white/10 rounded p-2 focus:border-neon-blue outline-none text-white"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            *Paste a direct image link (e.g., from Imgur) for now. File upload coming later.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-4 h-4 accent-neon-blue"
                        />
                        <label htmlFor="featured" className="text-sm text-gray-300">Feature on Home Page</label>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-neon flex items-center gap-2"
                        >
                            {loading && <Loader2 className="animate-spin" size={16} />}
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;