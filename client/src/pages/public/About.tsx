import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Timeline, { type TimelineItem } from '../../components/sections/Timeline';
import Skills, { type Skill } from '../../components/sections/skills';
import api from '../../services/api';
import { ExternalLink, Award, Code, FileText, Download } from 'lucide-react';

// --- Interfaces ---
interface Certification {
    name: string;
    issuer: string;
    year: string;
    link: string;
}

interface CodingProfile {
    platform: string;
    url: string;
    handle: string;
}

interface Achievement {
    _id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    certificate: string;
}

interface AboutData {
    bio: string;
    timeline: TimelineItem[];
    skills: Skill[];
    certifications: Certification[];
    codingProfiles: CodingProfile[];
    resumeUrl: string;
    achievements: Achievement[];
}

const About = () => {
    const [data, setData] = useState<AboutData>({
        bio: '',
        timeline: [],
        skills: [],
        certifications: [],
        codingProfiles: [],
        resumeUrl: '',
        achievements: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/misc/config');
                setData({
                    bio: res.data.bio || '',
                    timeline: res.data.timeline || [],
                    skills: res.data.skills || [],
                    certifications: res.data.certifications || [],
                    codingProfiles: res.data.codingProfiles || [],
                    resumeUrl: res.data.resumeUrl || '',
                    achievements: res.data.achievements || [],
                });
            } catch (err) {
                console.error("Error fetching about data:", err);
            }
        };
        fetchData();
    }, []);

    // --- Helper Functions ---

    // 1. Convert Drive Links for RESUME (PDF Embed)
    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            return url.replace(/\/view.*|\/edit.*/, '/preview');
        }
        return url;
    };

    // 2. Convert Drive Links for IMAGES (Robust Version with Thumbnail API)
    // const getDriveImgUrl = (url: string) => {
    //     if (!url) return '';
    //     if (url.includes('drive.google.com')) {
    //         const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    //         if (idMatch && idMatch[1]) {
    //             //return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
    //             return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    //         }
    //     }
    //     return url;
    // };

    // --- Default Fallbacks ---
    const defaultTimeline: TimelineItem[] = [
        { year: '2024', title: 'Full Stack Developer', company: 'Freelance', description: 'Building modern web applications.' },
        { year: '2023', title: 'Student', company: 'University', description: 'Learned Data Structures & Algorithms.' }
    ];

    const defaultSkills: Skill[] = [
        { name: 'React', level: 90, category: 'Frontend' },
        { name: 'Node.js', level: 85, category: 'Backend' },
        { name: 'MongoDB', level: 80, category: 'Database' },
        { name: 'TypeScript', level: 75, category: 'Language' },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">

                {/* Bio Section */}
                <section className="mb-20 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About <span className="text-neon-blue">Me</span>
                    </h1>
                    <div className="glass-card p-8 leading-relaxed text-gray-300 text-lg">
                        {data.bio || "Hello! I am a passionate developer..."}
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <span className="text-neon-purple">#</span> My Journey
                    </h2>
                    <Timeline items={data.timeline.length ? data.timeline : defaultTimeline} />
                </section>

                {/* Skills Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <span className="text-neon-green">#</span> Technical Skills
                    </h2>
                    <Skills skills={data.skills.length ? data.skills : defaultSkills} />
                </section>

                {/* Achievements Section */}
                {data.achievements && data.achievements.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="text-neon-green">#</span> Achievements
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.achievements.map((item) => (
                                <Link
                                    to={`/achievement/${item._id}`}
                                    key={item._id}
                                    className="glass-card group overflow-hidden hover:border-neon-green/50 transition-all duration-300"
                                >
                                    <div className="h-40 bg-dark-200 overflow-hidden relative">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                referrerPolicy="no-referrer"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                
                                            />
                                        ) : null}

                                        {/* Fallback Icon */}
                                        <div className={`absolute inset-0 flex items-center justify-center bg-white/5 ${item.image ? 'hidden fallback-active:flex' : 'flex'}`}>
                                            <Award className="text-gray-600 group-hover:text-neon-green transition-colors" size={40} />
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-neon-green font-bold text-sm border border-neon-green px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                                                View Details
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <span className="text-xs text-neon-green font-mono mb-2 block">{item.date}</span>
                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-neon-green transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {data.certifications && data.certifications.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="text-yellow-400">#</span> Certifications
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {data.certifications.map((cert, index) => (
                                <div key={index} className="glass-card p-5 flex items-start gap-4 hover:border-yellow-400/30 transition-colors">
                                    <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-400 shrink-0">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{cert.name}</h3>
                                        <p className="text-gray-400 text-sm">{cert.issuer} • {cert.year}</p>
                                        {cert.link && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-neon-blue text-sm mt-2 flex items-center gap-1 hover:underline"
                                            >
                                                Verify Credential <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Coding Profiles Section */}
                {data.codingProfiles && data.codingProfiles.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="text-pink-500">#</span> Coding Profiles
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {data.codingProfiles.map((profile, index) => (
                                <a
                                    key={index}
                                    href={profile.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass-card p-4 flex items-center gap-3 hover:bg-white/10 transition-colors border border-white/5 min-w-[200px] group"
                                >
                                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:text-white group-hover:bg-pink-500 transition-colors">
                                        <Code size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{profile.platform}</h4>
                                        <p className="text-xs text-gray-400 group-hover:text-gray-300">{profile.handle}</p>
                                    </div>
                                    <ExternalLink size={16} className="ml-auto text-gray-500 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* Resume Section */}
                {data.resumeUrl && data.resumeUrl.trim() !== '' && (
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="text-neon-blue">#</span> Resume / CV
                        </h2>

                        <div className="glass-card p-1 md:p-4 border-neon-blue/20">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <FileText size={20} className="text-neon-blue" />
                                    <span className="text-sm font-semibold">Resume Preview</span>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={data.resumeUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs font-bold bg-white/10 hover:bg-neon-purple hover:text-white px-3 py-1.5 rounded transition-all"
                                    >
                                        Open Tab
                                    </a>
                                    <a
                                        href={data.resumeUrl}
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-neon-blue hover:text-black px-3 py-1.5 rounded transition-all"
                                    >
                                        <Download size={14} /> Download
                                    </a>
                                </div>
                            </div>

                            <div className="w-full h-[500px] md:h-[800px] bg-dark-200 rounded overflow-hidden relative">
                                <iframe
                                    src={getEmbedUrl(data.resumeUrl)}
                                    className="w-full h-full border-none"
                                    title="Resume"
                                >
                                </iframe>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </>
    );
};

export default About;

// import { useEffect, useState } from 'react';
// import Navbar from '../../components/layout/Navbar';
// import Timeline, { type TimelineItem } from '../../components/sections/Timeline';
// import Skills, { type Skill } from '../../components/sections/Skills';
// import api from '../../services/api';
// import { ExternalLink, Award, Code, FileText, Download } from 'lucide-react';
// import { Link } from 'react-router-dom';
// // Define types for the new sections
// interface Certification {
//     name: string;
//     issuer: string;
//     year: string;
//     link: string;
// }

// interface CodingProfile {
//     platform: string;
//     url: string;
//     handle: string;
// }

// interface AboutData {
//     bio: string;
//     timeline: TimelineItem[];
//     skills: Skill[];
//     certifications: Certification[];
//     codingProfiles: CodingProfile[];
//     resumeUrl: string;
//     achievements: Achievement[];
// }

// interface Achievement {
//     _id: string;
//     title: string;
//     date: string;
//     description: string;
//     image: string;
//     certificate: string;
//   }

// const About = () => {
//     const [data, setData] = useState<AboutData>({
//         bio: '',
//         timeline: [],
//         skills: [],
//         certifications: [],
//         codingProfiles: [],
//         resumeUrl: '',
//         achievements: [],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await api.get('/misc/config');
//                 console.log("Fetched About Data:", res.data); // Debug log to check resumeUrl
//                 setData({
//                     bio: res.data.bio || '',
//                     timeline: res.data.timeline || [],
//                     skills: res.data.skills || [],
//                     certifications: res.data.certifications || [],
//                     codingProfiles: res.data.codingProfiles || [],
//                     resumeUrl: res.data.resumeUrl || '',
//                     achievements: res.data.achievements || [],
//                 });
//             } catch (err) {
//                 console.error("Error fetching about data:", err);
//             }
//         };
//         fetchData();
//     }, []);

//     // Default Fallback Data if DB is empty
//     const defaultTimeline: TimelineItem[] = [
//         { year: '2024', title: 'Full Stack Developer', company: 'Freelance', description: 'Building modern web applications.' },
//         { year: '2023', title: 'Student', company: 'University', description: 'Learned Data Structures & Algorithms.' }
//     ];

//     const defaultSkills: Skill[] = [
//         { name: 'React', level: 90, category: 'Frontend' },
//         { name: 'Node.js', level: 85, category: 'Backend' },
//         { name: 'MongoDB', level: 80, category: 'Database' },
//         { name: 'TypeScript', level: 75, category: 'Language' },
//     ];

//     // ✅ NEW HELPER FUNCTION: Converts Drive links to Embed links
//     const getEmbedUrl = (url: string) => {
//         if (!url) return '';
//         // Check if it is a Google Drive link
//         if (url.includes('drive.google.com')) {
//             // Replace '/view' with '/preview'
//             return url.replace(/\/view.*/, '/preview');
//         }
//         return url;
//     };

//     // const getDriveImgUrl = (url: string) => {
//     //     if (!url) return '';
//     //     // If it's a Google Drive link, convert to direct image link
//     //     if (url.includes('drive.google.com')) {
//     //         // Extract the ID
//     //         const idMatch = url.match(/\/d\/(.*?)\//);
//     //         if (idMatch && idMatch[1]) {
//     //             return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
//     //         }
//     //     }
//     //     console.log("url:", url);
//     //     return url; // Return original if not a Drive link
//     // };

//     // const getDriveImgUrl = (url: string) => {
//     //     if (!url) return '';
//     //     if (url.includes('drive.google.com')) {
//     //         // This extracts "1RRaSU8BoSVX9xonBiYkydxfz6MmrmBC5" correctly
//     //         const idMatch = url.match(/\/d\/(.*?)\//);
//     //         if (idMatch && idMatch[1]) {
//     //             return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
//     //         }
//     //     }
//     //     return url;
//     // };

//     // 2. Convert Drive Links for IMAGES (Robust Version)
//     const getDriveImgUrl = (url: string) => {
//         if (!url) return '';
//         if (url.includes('drive.google.com')) {
//             // Regex that handles both /view and links ending in just the ID
//             const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//             if (idMatch && idMatch[1]) {
//                 // Use the Thumbnail API with size width=800 (sz=w800)
//                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
//             }
//         }
//         return url;
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">

//                 {/* Bio Section */}
//                 <section className="mb-20 text-center md:text-left">
//                     <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                         About <span className="text-neon-blue">Me</span>
//                     </h1>
//                     <div className="glass-card p-8 leading-relaxed text-gray-300 text-lg">
//                         {data.bio || "Hello! I am a passionate developer..."}
//                     </div>
//                 </section>

//                 {/* Timeline Section */}
//                 <section className="mb-20">
//                     <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <span className="text-neon-purple">#</span> My Journey
//                     </h2>
//                     <Timeline items={data.timeline.length ? data.timeline : defaultTimeline} />
//                 </section>

//                 {/* Skills Section */}
//                 <section className="mb-20">
//                     <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <span className="text-neon-green">#</span> Technical Skills
//                     </h2>
//                     <Skills skills={data.skills.length ? data.skills : defaultSkills} />
//                 </section>

//                 {/* Certifications Section */}
//                 {data.certifications && data.certifications.length > 0 && (
//                     <section className="mb-20">
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-yellow-400">#</span> Certifications
//                         </h2>
//                         <div className="grid gap-4 md:grid-cols-2">
//                             {data.certifications.map((cert, index) => (
//                                 <div key={index} className="glass-card p-5 flex items-start gap-4 hover:border-yellow-400/30 transition-colors">
//                                     <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-400 shrink-0">
//                                         <Award size={24} />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-bold text-white text-lg">{cert.name}</h3>
//                                         <p className="text-gray-400 text-sm">{cert.issuer} • {cert.year}</p>
//                                         {cert.link && (
//                                             <a
//                                                 href={cert.link}
//                                                 target="_blank"
//                                                 rel="noreferrer"
//                                                 className="text-neon-blue text-sm mt-2 flex items-center gap-1 hover:underline"
//                                             >
//                                                 Verify Credential <ExternalLink size={12} />
//                                             </a>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* Coding Profiles Section */}
//                 {data.codingProfiles && data.codingProfiles.length > 0 && (
//                     <section className="mb-12">
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-pink-500">#</span> Coding Profiles
//                         </h2>
//                         <div className="flex flex-wrap gap-4">
//                             {data.codingProfiles.map((profile, index) => (
//                                 <a
//                                     key={index}
//                                     href={profile.url}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="glass-card p-4 flex items-center gap-3 hover:bg-white/10 transition-colors border border-white/5 min-w-[200px] group"
//                                 >
//                                     <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:text-white group-hover:bg-pink-500 transition-colors">
//                                         <Code size={20} />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-white">{profile.platform}</h4>
//                                         <p className="text-xs text-gray-400 group-hover:text-gray-300">{profile.handle}</p>
//                                     </div>
//                                     <ExternalLink size={16} className="ml-auto text-gray-500 group-hover:text-white" />
//                                 </a>
//                             ))}
//                         </div>
//                     </section>
//                 )}
//                 {/* ACHIEVEMENTS SECTION */}
//                 {data.achievements && data.achievements.length > 0 && (
//                     <section className="mb-20">
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-neon-green">#</span> Achievements
//                         </h2>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {data.achievements.map((item) => (
//                                 <Link
//                                     to={`/achievement/${item._id}`}
//                                     key={item._id}
//                                     className="glass-card group overflow-hidden hover:border-neon-green/50 transition-all duration-300"
//                                 >
//                                     {/* Image Thumbnail */}
//                                     <div className="h-40 bg-dark-200 overflow-hidden relative">
//                                         {item.image ? (
//                                             <img
//                                                 src={getDriveImgUrl(item.image)}
//                                                 alt={item.title}
//                                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center bg-white/5">
//                                                 <Award className="text-gray-600 group-hover:text-neon-green transition-colors" size={40} />
//                                             </div>
//                                         )}
//                                         {/* Overlay */}
//                                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                             <span className="text-neon-green font-bold text-sm border border-neon-green px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
//                                                 View Details
//                                             </span>
//                                         </div>
//                                     </div>

//                                     {/* Content */}
//                                     <div className="p-5">
//                                         <span className="text-xs text-neon-green font-mono mb-2 block">{item.date}</span>
//                                         <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-neon-green transition-colors">
//                                             {item.title}
//                                         </h3>
//                                         <p className="text-gray-400 text-sm line-clamp-2">
//                                             {item.description}
//                                         </p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     </section>
//                 )}
//                 {/* RESUME PREVIEW SECTION */}
//                 {data.resumeUrl && data.resumeUrl.trim() !== '' && (
//                     <section className="mb-20">
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-neon-blue">#</span> Resume / CV
//                         </h2>

//                         <div className="glass-card p-1 md:p-4 border-neon-blue/20">
//                             <div className="flex justify-between items-center mb-4 px-2">
//                                 <div className="flex items-center gap-2 text-gray-300">
//                                     <FileText size={20} className="text-neon-blue" />
//                                     <span className="text-sm font-semibold">Resume Preview</span>
//                                 </div>
//                                 <a
//                                     href={data.resumeUrl}
//                                     download
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-neon-blue hover:text-black px-3 py-1.5 rounded transition-all"
//                                 >
//                                     <Download size={14} /> Download PDF
//                                 </a>
//                             </div>

//                             {/* PDF Embed with Auto-Fix Function */}
//                             <div className="w-full h-[500px] md:h-[800px] bg-dark-200 rounded overflow-hidden relative">
//                                 <iframe
//                                     src={getEmbedUrl(data.resumeUrl)} // <--- UPDATED HERE
//                                     className="w-full h-full border-none"
//                                     title="Resume"
//                                     allow="autoplay"
//                                 >
//                                 </iframe>
//                             </div>
//                         </div>
//                     </section>
//                 )}


//             </div>
//         </>
//     );
// };

// export default About;

// import { useEffect, useState } from 'react';
// import Navbar from '../../components/layout/Navbar';
// import Timeline, { type TimelineItem } from '../../components/sections/Timeline';
// import Skills, { type Skill } from '../../components/sections/Skills';
// import api from '../../services/api';
// import { ExternalLink, Award, Code, FileText, Download } from 'lucide-react';

// // Define types for the new sections
// interface Certification {
//     name: string;
//     issuer: string;
//     year: string;
//     link: string;
// }

// interface CodingProfile {
//     platform: string;
//     url: string;
//     handle: string;
// }

// interface AboutData {
//     bio: string;
//     timeline: TimelineItem[];
//     skills: Skill[];
//     certifications: Certification[];
//     codingProfiles: CodingProfile[];
//     resumeUrl: string;
// }

// const About = () => {
//     const [data, setData] = useState<AboutData>({
//         bio: '',
//         timeline: [],
//         skills: [],
//         certifications: [],
//         codingProfiles: [],
//         resumeUrl: '',
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await api.get('/misc/config');
//                 setData({
//                     bio: res.data.bio || '',
//                     timeline: res.data.timeline || [],
//                     skills: res.data.skills || [],
//                     certifications: res.data.certifications || [],
//                     codingProfiles: res.data.codingProfiles || [],
//                     resumeUrl: res.data.resumeUrl || '',
//                 });
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchData();
//     }, []);

//     // Default Fallback Data if DB is empty
//     const defaultTimeline: TimelineItem[] = [
//         { year: '2024', title: 'Full Stack Developer', company: 'Freelance', description: 'Building modern web applications.' },
//         { year: '2023', title: 'Student', company: 'University', description: 'Learned Data Structures & Algorithms.' }
//     ];

//     const defaultSkills: Skill[] = [
//         { name: 'React', level: 90, category: 'Frontend' },
//         { name: 'Node.js', level: 85, category: 'Backend' },
//         { name: 'MongoDB', level: 80, category: 'Database' },
//         { name: 'TypeScript', level: 75, category: 'Language' },
//     ];

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">

//                 {/* Bio Section */}
//                 <section className="mb-20 text-center md:text-left">
//                     <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                         About <span className="text-neon-blue">Me</span>
//                     </h1>
//                     <div className="glass-card p-8 leading-relaxed text-gray-300 text-lg">
//                         {data.bio || "Hello! I am a passionate developer..."}
//                     </div>
//                 </section>

//                 {/* Timeline Section */}
//                 <section className="mb-20">
//                     <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <span className="text-neon-purple">#</span> My Journey
//                     </h2>
//                     <Timeline items={data.timeline.length ? data.timeline : defaultTimeline} />
//                 </section>

//                 {/* Skills Section */}
//                 <section className="mb-20">
//                     <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <span className="text-neon-green">#</span> Technical Skills
//                     </h2>
//                     <Skills skills={data.skills.length ? data.skills : defaultSkills} />
//                 </section>

//                 {/* Certifications Section */}
//                 {data.certifications && data.certifications.length > 0 && (
//                     <section className="mb-20">
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-yellow-400">#</span> Certifications
//                         </h2>
//                         <div className="grid gap-4 md:grid-cols-2">
//                             {data.certifications.map((cert, index) => (
//                                 <div key={index} className="glass-card p-5 flex items-start gap-4 hover:border-yellow-400/30 transition-colors">
//                                     <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-400 shrink-0">
//                                         <Award size={24} />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-bold text-white text-lg">{cert.name}</h3>
//                                         <p className="text-gray-400 text-sm">{cert.issuer} • {cert.year}</p>
//                                         {cert.link && (
//                                             <a
//                                                 href={cert.link}
//                                                 target="_blank"
//                                                 rel="noreferrer"
//                                                 className="text-neon-blue text-sm mt-2 flex items-center gap-1 hover:underline"
//                                             >
//                                                 Verify Credential <ExternalLink size={12} />
//                                             </a>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* Coding Profiles Section */}
//                 {data.codingProfiles && data.codingProfiles.length > 0 && (
//                     <section>
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-pink-500">#</span> Coding Profiles
//                         </h2>
//                         <div className="flex flex-wrap gap-4">
//                             {data.codingProfiles.map((profile, index) => (
//                                 <a
//                                     key={index}
//                                     href={profile.url}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="glass-card p-4 flex items-center gap-3 hover:bg-white/10 transition-colors border border-white/5 min-w-[200px] group"
//                                 >
//                                     <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:text-white group-hover:bg-pink-500 transition-colors">
//                                         <Code size={20} />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-white">{profile.platform}</h4>
//                                         <p className="text-xs text-gray-400 group-hover:text-gray-300">{profile.handle}</p>
//                                     </div>
//                                     <ExternalLink size={16} className="ml-auto text-gray-500 group-hover:text-white" />
//                                 </a>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* RESUME PREVIEW SECTION */}
//                 {data.resumeUrl && (
//                     <section className="mb-20">
//                         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                             <span className="text-neon-blue">#</span> Resume / CV
//                         </h2>

//                         <div className="glass-card p-1 md:p-4 border-neon-blue/20">
//                             {/* Toolbar */}
//                             <div className="flex justify-between items-center mb-4 px-2">
//                                 <div className="flex items-center gap-2 text-gray-300">
//                                     <FileText size={20} className="text-neon-blue" />
//                                     <span className="text-sm font-semibold">Resume Preview</span>
//                                 </div>
//                                 <a
//                                     href={data.resumeUrl}
//                                     download
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-neon-blue hover:text-black px-3 py-1.5 rounded transition-all"
//                                 >
//                                     <Download size={14} /> Download PDF
//                                 </a>
//                             </div>

//                             {/* PDF Embed */}
//                             <div className="w-full h-[500px] md:h-[800px] bg-dark-200 rounded overflow-hidden relative">
//                                 <iframe
//                                     src={`${data.resumeUrl}#toolbar=0`}
//                                     className="w-full h-full"
//                                     title="Resume"
//                                 >
//                                 </iframe>

//                                 {/* Fallback if iframe fails or is blocked */}
//                                 <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-gray-500">
//                                     <p>Loading document...</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 )}


//             </div>
//         </>
//     );
// };

// export default About;

// import { useEffect, useState } from 'react';
// import Navbar from '../../components/layout/Navbar';
// import Timeline, {type TimelineItem } from '../../components/sections/Timeline';
// import Skills, {type Skill } from '../../components/sections/Skills';
// import api from '../../services/api';
// import { ExternalLink, Award, Code } from 'lucide-react';

// const About = () => {
//     const [data, setData] = useState({
//         bio: '',
//         timeline: [] as TimelineItem[],
//         skills: [] as Skill[],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await api.get('/misc/config');
//                 setData(res.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchData();
//     }, []);

//     // Default Fallback Data if DB is empty
//     const defaultTimeline = [
//         { year: '2024', title: 'Full Stack Developer', company: 'Freelance', description: 'Building modern web applications.' },
//         { year: '2023', title: 'Student', company: 'University', description: 'Learned Data Structures & Algorithms.' }
//     ];

//     const defaultSkills = [
//         { name: 'React', level: 90, category: 'Frontend' },
//         { name: 'Node.js', level: 85, category: 'Backend' },
//         { name: 'MongoDB', level: 80, category: 'Database' },
//         { name: 'TypeScript', level: 75, category: 'Language' },
//     ];

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">

//                 {/* Bio Section */}
//                 <section className="mb-20 text-center md:text-left">
//                     <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                         About <span className="text-neon-blue">Me</span>
//                     </h1>
//                     <div className="glass-card p-8 leading-relaxed text-gray-300 text-lg">
//                         {data.bio || "Hello! I am a passionate developer..."}
//                     </div>
//                 </section>

//                 {/* Timeline Section */}
//                 <section className="mb-20">
//                     <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <span className="text-neon-purple">#</span> My Journey
//                     </h2>
//                     <Timeline items={data.timeline?.length ? data.timeline : defaultTimeline} />
//                 </section>

//                 {/* Skills Section */}
//                 <section>
//                     <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//                         <span className="text-neon-green">#</span> Technical Skills
//                     </h2>
//                     <Skills skills={data.skills?.length ? data.skills : defaultSkills} />
//                 </section>

//             </div>
//         </>
//     );
// };

// export default About;