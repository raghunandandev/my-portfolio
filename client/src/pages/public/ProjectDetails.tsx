import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Layers, Loader2, Share2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import api from '../../services/api';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // State for the custom "Copied" notification
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);
            } catch (error) {
                console.error("Error fetching project details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    // ✅ HELPER: Ensure Google Drive Images load
    const getDriveImgUrl = (url: string) => {
        if (!url) return '';
        // 1. Handle Drive Links
        if (url.includes('drive.google.com')) {
            const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (idMatch && idMatch[1]) {
                return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
            }
        }
        // 2. Handle Google User Content (Fix Mixed Content)
        if (url.includes('googleusercontent.com') && url.startsWith('http://')) {
            return url.replace('http://', 'https://');
        }
        return url;
    };

    // ✅ HELPER: Handle Copy Link with nice notification
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center text-white">
                <Loader2 className="animate-spin text-neon-blue" size={40} />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                <Link to="/projects" className="text-neon-blue hover:underline">Back to Projects</Link>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 bg-dark relative">

                {/* Hero / Cover Image */}
                <div className="w-full h-[40vh] md:h-[60vh] relative bg-dark-200 group">
                    <img
                        // ✅ FIX 1: Use getDriveImgUrl + imageUrl
                        src={getDriveImgUrl(project.imageUrl)}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                        onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/1200x600/1a1a1a/cccccc?text=No+Image";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 container mx-auto">
                        <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors bg-black/30 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:border-neon-blue">
                            <ArrowLeft size={16} className="mr-2" /> Back to Projects
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
                            {project.title}
                        </h1>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-300">
                            <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded-full">
                                {project.category || 'Development'}
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <Calendar size={14} /> {new Date(project.createdAt || Date.now()).getFullYear()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-neon-blue">#</span> Overview
                            </h2>
                            <div className="glass-card p-8 leading-relaxed text-gray-300 text-lg whitespace-pre-line">
                                {project.description}
                            </div>
                        </section>

                        {/* Tech Stack */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-neon-green">#</span> Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack?.map((tech: string, index: number) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 bg-dark-200 border border-white/10 rounded-lg text-gray-300 hover:border-neon-green/50 hover:text-neon-green transition-colors flex items-center gap-2"
                                    >
                                        <Layers size={16} /> {tech}
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar (Right) - Links & Meta */}
                    <div className="space-y-8">

                        {/* Action Card */}
                        <div className="glass-card p-6 sticky top-24 border-t-2 border-t-neon-purple">
                            <h3 className="text-xl font-bold text-white mb-6">Project Links</h3>

                            <div className="space-y-4">
                                {/* ✅ FIX 2: Correct property names (liveLink / githubLink) */}
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-neon w-full flex items-center justify-center gap-2 py-3 font-bold"
                                    >
                                        Live Demo <ExternalLink size={18} />
                                    </a>
                                )}

                                {project.githubLink ? (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-dark-200 border border-white/10 rounded text-white hover:bg-white/10 transition-colors"
                                    >
                                        View Source Code <Github size={18} />
                                    </a>
                                ) : (
                                    <div className="text-gray-500 text-center text-sm py-2">
                                        Source code is private
                                    </div>
                                )}
                            </div>

                            {/* <div className="mt-8 border-t border-white/5 pt-6">
                                <p className="text-sm text-gray-500 mb-2">Share this project</p>
                                <button
                                    onClick={handleCopyLink}
                                    className="w-full flex items-center justify-between text-xs text-gray-300 bg-black/20 p-3 rounded hover:bg-black/40 transition-colors border border-transparent hover:border-neon-blue/30 group"
                                >
                                    <span className="truncate mr-2 opacity-50">{window.location.href}</span>
                                    <span className="text-neon-blue font-bold flex items-center gap-1">
                                        <Share2 size={12} /> Copy
                                    </span>
                                </button>
                            </div> */}
                        </div>

                    </div>
                </div>

                {/* ✅ FIX 3: Beautiful Toast Notification */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-8 right-8 z-50 bg-dark-200 border border-neon-green/50 text-white px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(10,255,153,0.2)] flex items-center gap-3"
                        >
                            <div className="bg-neon-green/20 p-1 rounded-full text-neon-green">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Success</h4>
                                <p className="text-xs text-gray-400">Link copied to clipboard!</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
            {/* <Footer /> */}
        </>
    );
};

export default ProjectDetails;

// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Github, ExternalLink, Calendar, Layers, Loader2 } from 'lucide-react';
// import Navbar from '../../components/layout/Navbar';
// import Footer from '../../components/layout/Footer';
// import api from '../../services/api';

// const ProjectDetails = () => {
//     const { id } = useParams();
//     const [project, setProject] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProject = async () => {
//             try {
//                 // Fetch specific project by ID
//                 const res = await api.get(`/projects/${id}`);
//                 setProject(res.data);
//             } catch (error) {
//                 console.error("Error fetching project details", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProject();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-dark flex items-center justify-center text-white">
//                 <Loader2 className="animate-spin text-neon-blue" size={40} />
//             </div>
//         );
//     }

//     if (!project) {
//         return (
//             <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white">
//                 <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
//                 <Link to="/projects" className="text-neon-blue hover:underline">Back to Projects</Link>
//             </div>
//         );
//     }

//     return (
//         <>
//             <Navbar />
//             <main className="min-h-screen pt-24 pb-20 bg-dark">

//                 {/* Hero / Cover Image */}
//                 <div className="w-full h-[40vh] md:h-[60vh] relative bg-dark-200">
//                     <img
//                         src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c"}
//                         alt={project.title}
//                         className="w-full h-full object-cover opacity-80"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />

//                     <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 container mx-auto">
//                         <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors bg-black/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
//                             <ArrowLeft size={16} className="mr-2" /> Back to Projects
//                         </Link>
//                         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
//                             {project.title}
//                         </h1>

//                         {/* Quick Stats */}
//                         <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-300">
//                             {project.featured && (
//                                 <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full">
//                                     ★ Featured Project
//                                 </span>
//                             )}
//                             <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
//                                 <Calendar size={14} /> {new Date(project.createdAt).getFullYear()}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

//                     {/* Main Content (Left) */}
//                     <div className="lg:col-span-2 space-y-12">

//                         {/* Description */}
//                         <section>
//                             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//                                 <span className="text-neon-blue">#</span> Overview
//                             </h2>
//                             <div className="glass-card p-8 leading-relaxed text-gray-300 text-lg whitespace-pre-line">
//                                 {project.description}
//                             </div>
//                         </section>

//                         {/* Tech Stack */}
//                         <section>
//                             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//                                 <span className="text-neon-green">#</span> Tech Stack
//                             </h2>
//                             <div className="flex flex-wrap gap-3">
//                                 {project.techStack.map((tech: string, index: number) => (
//                                     <div
//                                         key={index}
//                                         className="px-4 py-2 bg-dark-200 border border-white/10 rounded-lg text-gray-300 hover:border-neon-green/50 hover:text-neon-green transition-colors flex items-center gap-2"
//                                     >
//                                         <Layers size={16} /> {tech}
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                     </div>

//                     {/* Sidebar (Right) - Links & Meta */}
//                     <div className="space-y-8">

//                         {/* Action Card */}
//                         <div className="glass-card p-6 sticky top-24">
//                             <h3 className="text-xl font-bold text-white mb-6">Project Links</h3>

//                             <div className="space-y-4">
//                                 {project.liveUrl && (
//                                     <a
//                                         href={project.liveUrl}
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         className="btn-neon w-full flex items-center justify-center gap-2 py-3"
//                                     >
//                                         Live Demo <ExternalLink size={18} />
//                                     </a>
//                                 )}

//                                 {project.repoUrl && (
//                                     <a
//                                         href={project.repoUrl}
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         className="w-full flex items-center justify-center gap-2 py-3 bg-dark-200 border border-white/10 rounded text-white hover:bg-white/5 transition-colors"
//                                     >
//                                         View Source <Github size={18} />
//                                     </a>
//                                 )}
//                             </div>

//                             <div className="mt-8 border-t border-white/5 pt-6">
//                                 <p className="text-sm text-gray-500 mb-2">Share this project</p>
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() => {
//                                             navigator.clipboard.writeText(window.location.href);
//                                             alert("Link copied to clipboard!");
//                                         }}
//                                         className="text-xs text-neon-blue hover:underline cursor-pointer"
//                                     >
//                                         Copy Link
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </main>
            
//         </>
//     );
// };

// export default ProjectDetails;