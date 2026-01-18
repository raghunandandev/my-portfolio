import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- Import Link
import type { Project } from '../../services/projectService.ts';

interface Props {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card overflow-hidden group hover:border-neon-blue/50 transition-all duration-300"
        >
            {/* Image Section - Wrapped in Link */}
            <div className="relative h-48 overflow-hidden">
                <Link to={`/projects/${project._id}`} className="block h-full w-full">
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all z-10" />
                    
                    <img
                        src={project.imageUrl || 'https://via.placeholder.com/400x300/1a1a1a/cccccc?text=Project+Preview'}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm border border-white/50 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                            View Details
                        </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-20 pointer-events-none">
                        <span className="px-3 py-1 text-xs font-bold bg-dark/80 backdrop-blur-sm text-white rounded-full border border-white/10">
                            {project.category}
                        </span>
                    </div>
                </Link>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                {/* Title - Wrapped in Link */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors w-fit">
                    <Link to={`/projects/${project._id}`}>
                        {project.title}
                    </Link>
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-white/5 text-neon-purple rounded border border-white/5 flex items-center gap-1"
                        >
                            <Code2 size={10} /> {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-white/5 text-gray-500 rounded border border-white/5">
                            +{project.techStack.length - 4} more
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-4">
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-white hover:text-neon-blue transition-colors"
                        >
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto"
                        >
                            <Github size={16} /> Code
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

// import { motion } from 'framer-motion';
// import { ExternalLink, Github, Code2 } from 'lucide-react';
// import type{Project}  from '../../services/projectService.ts';

// interface Props {
//     project: Project;
//     index: number;
// }

// const ProjectCard = ({ project, index }: Props) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             className="glass-card overflow-hidden group hover:border-neon-blue/50 transition-all duration-300"
//         >
//             {/* Image Section */}
//             <div className="relative h-48 overflow-hidden">
//                 <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all z-10" />
//                 <img
//                     src={project.imageUrl || 'https://via.placeholder.com/400x300/1a1a1a/cccccc?text=Project+Preview'}
//                     alt={project.title}
//                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                 />

//                 {/* Category Badge */}
//                 <div className="absolute top-3 right-3 z-20">
//                     <span className="px-3 py-1 text-xs font-bold bg-dark/80 backdrop-blur-sm text-white rounded-full border border-white/10">
//                         {project.category}
//                     </span>
//                 </div>
//             </div>

//             {/* Content Section */}
//             <div className="p-6">
//                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
//                     {project.title}
//                 </h3>

//                 <p className="text-gray-400 text-sm mb-4 line-clamp-3">
//                     {project.description}
//                 </p>

//                 {/* Tech Stack Tags */}
//                 <div className="flex flex-wrap gap-2 mb-6">
//                     {project.techStack.map((tech) => (
//                         <span
//                             key={tech}
//                             className="px-2 py-1 text-xs bg-white/5 text-neon-purple rounded border border-white/5 flex items-center gap-1"
//                         >
//                             <Code2 size={10} /> {tech}
//                         </span>
//                     ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center gap-4 mt-auto">
//                     {project.liveLink && (
//                         <a
//                             href={project.liveLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 text-sm text-white hover:text-neon-blue transition-colors"
//                         >
//                             <ExternalLink size={16} /> Live Demo
//                         </a>
//                     )}
//                     {project.githubLink && (
//                         <a
//                             href={project.githubLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
//                         >
//                             <Github size={16} /> Code
//                         </a>
//                     )}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default ProjectCard;