
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cloud, Code2, Cpu, GitBranch, Globe, Loader2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/sections/Hero';
import Footer from '../../components/layout/Footer';
import ProjectCard from '../../components/sections/ProjectCard';
import CircularCounter from '../../components/common/CircularCounter'; // <--- Import New Component
import { fetchProjects, type Project } from '../../services/projectService';
import api from '../../services/api';

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [dsaCount, setDsaCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const projectsData = await fetchProjects();
                const featured = projectsData.filter(p => p.featured);
                setFeaturedProjects(featured.length > 0 ? featured.slice(0, 3) : projectsData.slice(0, 3));

                const configRes = await api.get('/misc/config');
                setDsaCount(configRes.data.dsaSolved || 0);
            } catch (error) {
                console.error("Failed to load home data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <main className="overflow-hidden bg-dark">
                <Hero />

                {/* SERVICES SECTION */}
                <section className="py-24 relative border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I <span className="text-neon-blue">Do</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                Create Systems with engineering precision.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="glass-card p-8 hover:border-neon-blue transition-colors group">
                                <Globe className="text-neon-blue mb-4 w-10 h-10" />
                                <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
                                <p className="text-gray-400">Scalable MERN stack applications.</p>
                            </div>
                            <div className="glass-card p-8 hover:border-neon-purple transition-colors group">
                                <Code2 className="text-neon-purple mb-4 w-10 h-10" />
                                <h3 className="text-xl font-bold text-white mb-3">Algorithm Design</h3>
                                <p className="text-gray-400">Optimized solutions for complex problems.</p>
                            </div>
                            <div className="glass-card p-8 hover:border-neon-green transition-colors group">
                                <Cpu className="text-neon-green mb-4 w-10 h-10" />
                                <h3 className="text-xl font-bold text-white mb-3">System Architecture</h3>
                                <p className="text-gray-400">Secure and robust backend systems.</p>
                            </div>
                            <div className="glass-card p-8 hover:border-neon-green transition-colors group">
                                <Box className="text-neon-green mb-4 w-10 h-10" />
                                <h3 className="text-xl font-bold text-white mb-3">Object Oriented Programming</h3>
                                <p className="text-gray-400">Model the real world in code.</p>
                            </div>
                            <div className="glass-card p-8 hover:border-neon-green transition-colors group">
                                <Cloud className="text-neon-green mb-4 w-10 h-10" />
                                <h3 className="text-xl font-bold text-white mb-3">Cloud & DevOps</h3>
                                <p className="text-gray-400">Build, deploy, and scale systems reliably in the cloud.</p>
                            </div>
                            <div className="glass-card p-8 hover:border-neon-green transition-colors group">
                                <GitBranch className="text-neon-green mb-4 w-10 h-10" />
                                <h3 className="text-xl font-bold text-white mb-3">Open Source</h3>
                                <p className="text-gray-400">
                                    Contributing to community-driven software and collaborative innovation.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* FEATURED PROJECTS */}
                <section className="py-20 relative bg-dark-100/30">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Featured <span className="text-neon-purple">Projects</span></h2>
                            <Link to="/projects" className="hidden md:flex items-center gap-2 text-neon-blue hover:text-white transition-colors">
                                View All <ArrowRight size={16} />
                            </Link>
                        </div>
                        {loading ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-neon-blue" /></div> : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {featuredProjects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
                            </div>
                        )}
                    </div>
                </section>

                {/* NEW: DSA STATS SECTION (Circular Counter) */}
                <section className="py-24 relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-dark to-dark-100">
                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-neon-purple/5 blur-[100px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-12">Problem Solving <span className="text-neon-purple">Stats</span></h2>

                        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                            {/* Main Circular Counter */}
                            <CircularCounter target={dsaCount} label="Total Solved" />

                            {/* Secondary Stats (Static for layout balance) */}
                            <div className="flex flex-col justify-center gap-8 text-left">
                                <div>
                                    <h4 className="text-4xl font-bold text-white mb-1">500<span className="text-neon-blue">+</span></h4>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">LeetCode</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-bold text-white mb-1">150<span className="text-neon-green">+</span></h4>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">CodeForces</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to collaborate?</h2>
                    <Link to="/contact" className="px-8 py-4 bg-white text-dark font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
                        Get in Touch <ArrowRight size={20} />
                    </Link>
                </section>

            </main>
            {/* <Footer /> */}
        </>
    );
};

export default Home;

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Code2, Cpu, Globe, Loader2, Download, User } from 'lucide-react';
// import Navbar from '../../components/layout/Navbar';
// import Footer from '../../components/layout/Footer';
// import ProjectCard from '../../components/sections/ProjectCard';
// import CircularCounter from '../../components/common/CircularCounter';
// import { fetchProjects, type Project } from '../../services/projectService';
// import api from '../../services/api';

// const Home = () => {
//     const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
//     const [dsaCount, setDsaCount] = useState(0);
//     const [profileImage, setProfileImage] = useState('');
//     const [resumeUrl, setResumeUrl] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 setLoading(true);
//                 // 1. Fetch Projects
//                 const projectsData = await fetchProjects();
//                 const featured = projectsData.filter(p => p.featured);
//                 setFeaturedProjects(featured.length > 0 ? featured.slice(0, 3) : projectsData.slice(0, 3));

//                 // 2. Fetch Config (DSA, Image, Resume)
//                 const configRes = await api.get('/misc/config');
//                 setDsaCount(configRes.data.dsaSolved || 0);
//                 setProfileImage(configRes.data.profileImage || '');
//                 setResumeUrl(configRes.data.resumeUrl || '');
//             } catch (error) {
//                 console.error("Failed to load home data", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadData();
//     }, []);

//     // ✅ HELPER: Robust Image URL Handler (Fixes Drive & Mixed Content)
//     const getDriveImgUrl = (url: string) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w400`;
//             }
//         }
//         if (url.includes('googleusercontent.com') && url.startsWith('http://')) {
//             return url.replace('http://', 'https://');
//         }
//         return url;
//     };

//     return (
//         <>
//             <Navbar />
//             <main className="overflow-hidden bg-dark">

//                 {/* ✅ HERO SECTION (Responsive Flexbox Layout) */}
//                 {/* min-h-screen ensures it expands to fit content on mobile, preventing overlap */}
//                 <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-10 px-4">

//                     {/* Background Ambience */}
//                     <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//                         <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px]" />
//                         <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-neon-blue/20 rounded-full blur-[100px]" />
//                     </div>

//                     <div className="container mx-auto max-w-5xl z-10 flex flex-col items-center text-center">

//                         {/* 1. Profile Image with Rings */}
//                         <div className="mb-8 relative group">
//                             {/* Decorative Rings */}
//                             <div className="absolute -inset-4 border border-white/5 rounded-full animate-[spin_10s_linear_infinite] border-dashed pointer-events-none" />
//                             <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />

//                             <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-dark-100 shadow-2xl">
//                                 {profileImage ? (
//                                     <img
//                                         src={getDriveImgUrl(profileImage)}
//                                         alt="Profile"
//                                         referrerPolicy="no-referrer"
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full bg-dark-200 flex items-center justify-center">
//                                         <User className="text-gray-500 w-16 h-16" />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* 2. Main Headings */}
//                         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
//                             Crafting <br className="md:hidden" />
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-cyan-400">
//                                 Digital
//                             </span>
//                             <br />
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-neon-purple">
//                                 Experiences
//                             </span>
//                         </h1>

//                         <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
//                             Full Stack Developer & UI/UX Enthusiast. I build accessible, pixel-perfect, and performant web applications.
//                         </p>

//                         {/* 3. Buttons (Flex column on mobile ensures vertical spacing) */}
//                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 md:mb-24">
//                             <Link
//                                 to="/projects"
//                                 className="btn-neon w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-lg"
//                             >
//                                 View My Work <ArrowRight size={20} />
//                             </Link>

//                             {resumeUrl && (
//                                 <a
//                                     href={resumeUrl}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="w-full sm:w-auto px-8 py-3.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2 hover:border-neon-blue/50"
//                                 >
//                                     <Download size={20} className="text-neon-blue" /> Resume
//                                 </a>
//                             )}
//                         </div>

//                         {/* 4. Stats Grid (Relative Positioning - No Overlap) */}
//                         <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 glass-card p-6 md:p-8 border-t-2 border-t-neon-blue/20">

//                             <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5">
//                                 <span className="text-4xl md:text-5xl font-bold text-white mb-2">
//                                     {dsaCount > 0 ? dsaCount : '700'}<span className="text-neon-blue">+</span>
//                                 </span>
//                                 <span className="text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase">
//                                     DSA Solved
//                                 </span>
//                             </div>

//                             <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5">
//                                 <span className="text-4xl md:text-5xl font-bold text-white mb-2">
//                                     2<span className="text-neon-purple">+</span>
//                                 </span>
//                                 <span className="text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase">
//                                     Years Exp
//                                 </span>
//                             </div>

//                             <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5">
//                                 <span className="text-4xl md:text-5xl font-bold text-white mb-2">
//                                     10<span className="text-green-400">+</span>
//                                 </span>
//                                 <span className="text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase">
//                                     Projects
//                                 </span>
//                             </div>
//                         </div>

//                     </div>
//                 </section>

//                 {/* SERVICES SECTION */}
//                 <section className="py-24 relative border-t border-white/5">
//                     <div className="container mx-auto px-4">
//                         <div className="text-center mb-16">
//                             <h2 className="text-3xl md:text-4xl font-bold mb-4">What I <span className="text-neon-blue">Do</span></h2>
//                             <p className="text-gray-400 max-w-2xl mx-auto text-lg">
//                                 Combining artistic design with engineering precision.
//                             </p>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                             <div className="glass-card p-8 hover:border-neon-blue transition-colors group">
//                                 <Globe className="text-neon-blue mb-4 w-10 h-10" />
//                                 <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
//                                 <p className="text-gray-400">Scalable MERN stack applications.</p>
//                             </div>
//                             <div className="glass-card p-8 hover:border-neon-purple transition-colors group">
//                                 <Code2 className="text-neon-purple mb-4 w-10 h-10" />
//                                 <h3 className="text-xl font-bold text-white mb-3">Algorithm Design</h3>
//                                 <p className="text-gray-400">Optimized solutions for complex problems.</p>
//                             </div>
//                             <div className="glass-card p-8 hover:border-neon-green transition-colors group">
//                                 <Cpu className="text-neon-green mb-4 w-10 h-10" />
//                                 <h3 className="text-xl font-bold text-white mb-3">System Architecture</h3>
//                                 <p className="text-gray-400">Secure and robust backend systems.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* FEATURED PROJECTS */}
//                 <section className="py-20 relative bg-dark-100/30">
//                     <div className="container mx-auto px-4">
//                         <div className="flex justify-between items-end mb-12">
//                             <h2 className="text-3xl md:text-4xl font-bold">Featured <span className="text-neon-purple">Projects</span></h2>
//                             <Link to="/projects" className="hidden md:flex items-center gap-2 text-neon-blue hover:text-white transition-colors">
//                                 View All <ArrowRight size={16} />
//                             </Link>
//                         </div>
//                         {loading ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-neon-blue" /></div> : (
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                                 {featuredProjects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* DSA STATS SECTION */}
//                 <section className="py-24 relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-dark to-dark-100">
//                     <div className="absolute inset-0 bg-neon-purple/5 blur-[100px] pointer-events-none" />
//                     <div className="container mx-auto px-4 relative z-10 text-center">
//                         <h2 className="text-3xl font-bold text-white mb-12">Problem Solving <span className="text-neon-purple">Stats</span></h2>
//                         <div className="flex flex-wrap justify-center gap-12 md:gap-24">
//                             <CircularCounter target={dsaCount} label="Total Solved" />
//                             <div className="flex flex-col justify-center gap-8 text-left">
//                                 <div>
//                                     <h4 className="text-4xl font-bold text-white mb-1">500<span className="text-neon-blue">+</span></h4>
//                                     <p className="text-sm text-gray-400 uppercase tracking-widest">LeetCode</p>
//                                 </div>
//                                 <div>
//                                     <h4 className="text-4xl font-bold text-white mb-1">150<span className="text-neon-green">+</span></h4>
//                                     <p className="text-sm text-gray-400 uppercase tracking-widest">CodeForces</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* CTA */}
//                 <section className="py-24 text-center">
//                     <h2 className="text-4xl font-bold text-white mb-6">Ready to collaborate?</h2>
//                     <Link to="/contact" className="px-8 py-4 bg-white text-dark font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
//                         Get in Touch <ArrowRight size={20} />
//                     </Link>
//                 </section>

//             </main>
//             <Footer />
//         </>
//     );
// };

// export default Home;