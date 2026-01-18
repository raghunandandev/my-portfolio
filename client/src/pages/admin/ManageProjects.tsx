import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import api from '../../services/api';
import type { Project } from '../../services/projectService';
import ProjectForm from '../../components/admin/ProjectForm';

const ManageProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const fetchProjects = async () => {
        const { data } = await api.get('/projects');
        setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await api.delete(`/projects/${id}`);
            fetchProjects(); // Refresh list
        }
    };

    const handleSave = async (projectData: Partial<Project>) => {
        if (editingProject) {
            await api.put(`/projects/${editingProject._id}`, projectData);
        } else {
            await api.post('/projects', projectData);
        }
        setIsFormOpen(false);
        setEditingProject(null);
        fetchProjects();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setIsFormOpen(true);
                    }}
                    className="btn-neon flex items-center gap-2"
                >
                    <Plus size={20} /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="glass-card p-4 flex flex-col md:flex-row items-center gap-4 group hover:bg-white/5 transition-colors"
                    >
                        {/* Image Preview */}
                        <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden bg-dark-200 shrink-0">
                            {project.imageUrl && (
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                            <div className="flex gap-2 justify-center md:justify-start mt-2">
                                {project.techStack.slice(0, 3).map((tech) => (
                                    <span key={tech} className="text-xs bg-white/10 px-2 py-1 rounded text-neon-blue">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setEditingProject(project);
                                    setIsFormOpen(true);
                                }}
                                className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                                title="Edit"
                            >
                                <Edit2 size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={20} />
                            </button>
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No projects found. Click "Add Project" to start.
                    </div>
                )}
            </div>

            {isFormOpen && (
                <ProjectForm
                    initialData={editingProject}
                    onSubmit={handleSave}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingProject(null);
                    }}
                />
            )}
        </div>
    );
};

export default ManageProjects;