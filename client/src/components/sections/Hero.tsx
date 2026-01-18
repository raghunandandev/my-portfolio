// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Download, ChevronDown } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../../services/api';

// const Hero = () => {
//     const [data, setData] = useState({
//         profileImage: '',
//         dsaSolved: 0,
//         resumeUrl: ''
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await api.get('/misc/config');
//                 setData({
//                     profileImage: res.data.profileImage,
//                     dsaSolved: res.data.dsaSolved || 0,
//                     resumeUrl: res.data.resumeUrl
//                 });
//             } catch (error) {
//                 console.error("Error fetching hero data", error);
//             }
//         };
//         fetchData();
//     }, []);

//     // Smooth scroll handler
//     const scrollDown = () => {
//         window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
//     };

//     return (
//         <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">

//             {/* Background Ambience */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
//                 <div className="absolute top-20 left-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
//                 <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
//             </div>

//             <div className="container mx-auto px-4 z-10 flex flex-col-reverse md:flex-row items-center gap-12 mb-20">

//                 {/* Left Side: Text */}
//                 <div className="flex-1 text-center md:text-left">
//                     <motion.div
//                         initial={{ opacity: 0, x: -30 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <div className="inline-block px-3 py-1 mb-4 border border-neon-blue/30 rounded-full bg-neon-blue/5 backdrop-blur-sm">
//                             <span className="text-neon-blue text-xs font-bold tracking-widest uppercase">
//                                 Welcome to my portfolio
//                             </span>
//                         </div>

//                         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//                             Crafting <br />
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-purple-500 to-neon-purple text-glow">
//                                 Digital Experiences
//                             </span>
//                         </h1>

//                         <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
//                             Full Stack Developer & UI/UX Enthusiast. I build accessible, pixel-perfect, and performant web applications.
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                             <Link to="/projects" className="btn-neon flex items-center justify-center gap-2 group">
//                                 View My Work
//                                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                             </Link>

//                             {data.resumeUrl && (
//                                 <a
//                                     href={data.resumeUrl}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-white font-medium"
//                                 >
//                                     <Download size={18} /> Resume
//                                 </a>
//                             )}
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* Right Side: Profile Image */}
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="flex-1 flex justify-center relative"
//                 >
//                     <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
//                         {/* Rotating Ring */}
//                         <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow border-dashed" />
//                         <div className="absolute inset-4 border border-neon-purple/20 rounded-full animate-reverse-spin" />

//                         {/* Image Container */}
//                         <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-dark-100 shadow-2xl">
//                             <img
//                                 src={data.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80"}
//                                 alt="Profile"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>

//                         {/* Floating Badge */}
//                         <motion.div
//                             animate={{ y: [0, -10, 0] }}
//                             transition={{ repeat: Infinity, duration: 4 }}
//                             className="absolute bottom-10 -left-4 glass-card px-5 py-3 border-l-4 border-neon-green"
//                         >
//                             <span className="block text-xs text-gray-400 uppercase">Available for</span>
//                             <span className="font-bold text-white">Freelance Projects</span>
//                         </motion.div>
//                     </div>
//                 </motion.div>
//             </div>

//             {/* BOTTOM STATS BAR (DSA Counter) */}
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8, duration: 0.5 }}
//                 className="absolute bottom-0 left-0 w-full bg-dark-100/50 backdrop-blur-md border-t border-white/5"
//             >
//                 <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">

//                     {/* DSA Stat */}
//                     <div className="text-center">
//                         <h3 className="text-3xl font-bold text-white font-mono">
//                             {data.dsaSolved}<span className="text-neon-purple">+</span>
//                         </h3>
//                         <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">DSA Problems Solved</p>
//                     </div>

//                     {/* Experience Stat (Static for now, or dynamic if you add startYear to DB) */}
//                     <div className="text-center">
//                         <h3 className="text-3xl font-bold text-white font-mono">2<span className="text-neon-blue">+</span></h3>
//                         <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Years Experience</p>
//                     </div>

//                     {/* Projects Stat */}
//                     <div className="text-center">
//                         <h3 className="text-3xl font-bold text-white font-mono">10<span className="text-neon-green">+</span></h3>
//                         <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Projects Completed</p>
//                     </div>

//                     {/* Scroll Down Indicator */}
//                     <div className="flex items-center justify-center cursor-pointer hover:text-neon-blue transition-colors" onClick={scrollDown}>
//                         <div className="text-center">
//                             <ChevronDown className="animate-bounce mx-auto" />
//                             <span className="text-xs uppercase tracking-widest">Scroll</span>
//                         </div>
//                     </div>

//                 </div>
//             </motion.div>
//         </section>
//     );
// };

// export default Hero;


import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Hero = () => {
    const [data, setData] = useState({
        profileImage: '',
        dsaSolved: 0,
        resumeUrl: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/misc/config');
                setData({
                    profileImage: res.data.profileImage,
                    dsaSolved: res.data.dsaSolved || 0,
                    resumeUrl: res.data.resumeUrl
                });
            } catch (error) {
                console.error("Error fetching hero data", error);
            }
        };
        fetchData();
    }, []);

    // Helper for Drive Images
    const getDriveImgUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (idMatch && idMatch[1]) {
                return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w400`;
            }
        }
        if (url.includes('googleusercontent.com') && url.startsWith('http://')) {
            return url.replace('http://', 'https://');
        }
        return url;
    };

    const scrollDown = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 z-10 flex-grow flex flex-col justify-center">

                <div className="flex flex-col-reverse md:flex-row items-center gap-12 py-10 md:py-0">

                    {/* Left Side: Text */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block px-3 py-1 mb-4 border border-neon-blue/30 rounded-full bg-neon-blue/5 backdrop-blur-sm">
                                <span className="text-neon-blue text-xs font-bold tracking-widest uppercase">
                                    Hi, I build scalable and impactful software.
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Imagination <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-purple-500 to-neon-purple text-glow">
                                    Creativity Impact
                                </span>
                            </h1>

                            <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
                                I’m a software developer fascinated by how complex systems work beneath the surface. I build applications that are fast, scalable, and visually immersive.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/projects" className="btn-neon flex items-center justify-center gap-2 group">
                                    View My Work
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {data.resumeUrl && (
                                    <a
                                        href={data.resumeUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-white font-medium"
                                    >
                                        <Download size={18} /> Resume
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Profile Image (UI Effect Restored) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 flex justify-center relative"
                    >
                        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">

                            {/* ✅ RESTORED: Glow Effect Behind */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-2xl opacity-20 pointer-events-none" />

                            {/* ✅ RESTORED: Rotating Rings */}
                            <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite] border-dashed pointer-events-none" />
                            <div className="absolute inset-4 border border-neon-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

                            {/* Image Container */}
                            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-dark-100 shadow-2xl z-10">
                                {data.profileImage ? (
                                    <img
                                        src={getDriveImgUrl(data.profileImage)}
                                        alt="Profile"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-dark-200 flex items-center justify-center">
                                        <User className="text-gray-500 w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            {/* ✅ RESTORED: Badge (Visible on Mobile now) */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute bottom-6 -left-2 md:bottom-10 md:-left-4 glass-card px-4 py-2 md:px-5 md:py-3 border-l-4 border-neon-green z-20"
                            >
                                <span className="block text-[10px] md:text-xs text-gray-400 uppercase">Available for</span>
                                <span className="font-bold text-white text-sm md:text-base">Freelance Projects</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="w-full bg-dark-100/50 backdrop-blur-md border-t border-white/5 mt-auto"
            >
                <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">

                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white font-mono">
                            {data.dsaSolved > 0 ? data.dsaSolved : 0}<span className="text-neon-purple">+</span>
                        </h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">DSA Solved</p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white font-mono">1000<span className="text-neon-blue">+</span></h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Commits</p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-white font-mono">10<span className="text-neon-green">+</span></h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Projects</p>
                    </div>

                    <div className="flex items-center justify-center cursor-pointer hover:text-neon-blue transition-colors" onClick={scrollDown}>
                        <div className="text-center">
                            <ChevronDown className="animate-bounce mx-auto" />
                            <span className="text-xs uppercase tracking-widest">Scroll</span>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
};

export default Hero;