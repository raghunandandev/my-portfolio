import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube, Terminal, Eye } from 'lucide-react';
import api from '../../services/api';

const Footer = () => {
    const [socials, setSocials] = useState<{ platform: string; url: string }[]>([]);
    const [visitorCount, setVisitorCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Socials
                const configRes = await api.get('/misc/config');
                setSocials(configRes.data.socials || []);

                // 2. Track Visit & Get Count
                // (Tracking happens automatically on page load usually, but here we explicitly call the count endpoint)
                await api.post('/misc/track-visitor'); // Ensure current visit is logged
                const countRes = await api.get('/misc/visitor-count');
                setVisitorCount(countRes.data.count);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const getIcon = (platform: string) => {
        // ... (Same icon logic as before)
        switch (platform.toLowerCase()) {
            case 'github': return <Github size={20} />;
            case 'linkedin': return <Linkedin size={20} />;
            case 'twitter': return <Twitter size={20} />;
            case 'instagram': return <Instagram size={20} />;
            case 'facebook': return <Facebook size={20} />;
            case 'youtube': return <Youtube size={20} />;
            default: return <Terminal size={20} />;
        }
    };

    return (
        <footer className="bg-dark-100 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4 text-center">

                {/* Logo */}
                <div className="flex justify-center items-center gap-2 mb-6">
                    <Terminal className="text-neon-blue w-6 h-6" />
                    <span className="text-xl font-bold text-white tracking-tighter">
                        DEV<span className="text-neon-purple">.PORTFOLIO</span>
                    </span>
                </div>

                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    designed in darkness • built with intention
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-12">
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white/5 rounded-full text-gray-400 hover:bg-white/10 hover:text-white hover:-translate-y-1 transition-all duration-300"
                        >
                            {getIcon(social.platform)}
                        </a>
                    ))}
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>

                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        {/* Privacy Links */}
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>

                        {/* LIVE VISITOR COUNT */}
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-neon-green/80">
                            <Eye size={14} />
                            <span className="font-mono font-bold">{visitorCount}</span>
                            <span className="text-xs uppercase">Visits</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

// import { useEffect, useState } from 'react';
// import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube, Terminal } from 'lucide-react';
// import api from '../../services/api';

// const Footer = () => {
//     const [socials, setSocials] = useState<{ platform: string; url: string }[]>([]);

//     useEffect(() => {
//         const fetchSocials = async () => {
//             try {
//                 const res = await api.get('/misc/config');
//                 setSocials(res.data.socials || []);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchSocials();
//     }, []);

//     const getIcon = (platform: string) => {
//         switch (platform.toLowerCase()) {
//             case 'github': return <Github size={20} />;
//             case 'linkedin': return <Linkedin size={20} />;
//             case 'twitter': return <Twitter size={20} />;
//             case 'instagram': return <Instagram size={20} />;
//             case 'facebook': return <Facebook size={20} />;
//             case 'youtube': return <Youtube size={20} />;
//             default: return <Terminal size={20} />;
//         }
//     };

//     return (
//         <footer className="bg-dark-100 border-t border-white/5 pt-16 pb-8">
//             <div className="container mx-auto px-4 text-center">

//                 {/* Logo */}
//                 <div className="flex justify-center items-center gap-2 mb-6">
//                     <Terminal className="text-neon-blue w-6 h-6" />
//                     <span className="text-xl font-bold text-white tracking-tighter">
//                         DEV<span className="text-neon-purple">.PORTFOLIO</span>
//                     </span>
//                 </div>

//                 {/* Tagline */}
//                 <p className="text-gray-400 max-w-md mx-auto mb-8">
//                     Building the future with code. Specialized in MERN Stack, UI/UX, and Scalable Systems.
//                 </p>

//                 {/* Dynamic Social Links */}
//                 <div className="flex justify-center gap-6 mb-12">
//                     {socials.map((social, index) => (
//                         <a
//                             key={index}
//                             href={social.url}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="p-3 bg-white/5 rounded-full text-gray-400 hover:bg-white/10 hover:text-white hover:-translate-y-1 transition-all duration-300"
//                             title={social.platform}
//                         >
//                             {getIcon(social.platform)}
//                         </a>
//                     ))}
//                 </div>

//                 <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//                     <p>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
//                     <div className="flex gap-6 mt-4 md:mt-0">
//                         <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//                         <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;