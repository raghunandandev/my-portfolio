import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import ProjectCard from '../../components/sections/ProjectCard';
import { fetchProjects, type Project } from '../../services/projectService';
import { Loader2 } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Work</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A selection of projects ranging from web applications to algorithmic visualizations.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 text-neon-blue animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                        {error}
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                No projects found. Check back soon!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Projects;