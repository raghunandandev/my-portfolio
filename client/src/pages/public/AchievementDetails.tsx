import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink, Award } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import api from '../../services/api';

const AchievementDetails = () => {
    const { id } = useParams();
    const [achievement, setAchievement] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await api.get('/misc/config');
                const found = res.data.achievements?.find((a: any) => a._id === id);
                setAchievement(found);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, [id]);

    // Robust Drive Image Helper
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

    if (loading) return <div className="text-white text-center pt-32">Loading...</div>;
    if (!achievement) return <div className="text-white text-center pt-32">Achievement not found.</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">

                {/* Back Button */}
                <Link to="/about" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to About
                </Link>

                {/* Content Card */}
                <div className="glass-card overflow-hidden">

                    {/* Header Image */}
                    <div className="w-full h-64 md:h-80 bg-dark-200 relative">
                        {achievement.image ? (
                            <img
                                src={achievement.image}
                                alt={achievement.title}
                                referrerPolicy='no-referrer'
                                className="w-full h-full object-cover"
                                
                            />
                        ) : null}

                        {/* Fallback Icon */}
                        {(!achievement.image || achievement.image === '') && (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-transparent absolute inset-0">
                                <Award size={64} className="text-neon-green/50" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                    </div>

                    <div className="p-8 relative -mt-10">
                        {/* Title & Date */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                {achievement.title}
                            </h1>
                            <div className="flex items-center gap-2 text-neon-green bg-neon-green/10 px-3 py-1 rounded-full w-fit">
                                <Calendar size={16} />
                                <span className="font-mono text-sm">{achievement.date}</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 mb-8" />

                        {/* Description */}
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed mb-8">
                            <p className="whitespace-pre-line text-lg">{achievement.description}</p>
                        </div>

                        {/* Action Button (Certificate) */}
                        {achievement.certificate && (
                            <a
                                href={achievement.certificate}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-neon inline-flex items-center gap-2"
                            >
                                View Official Certificate <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AchievementDetails;

// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Calendar, ExternalLink, Award } from 'lucide-react';
// import Navbar from '../../components/layout/Navbar';
// import api from '../../services/api';

// const AchievementDetails = () => {
//     const { id } = useParams();
//     const [achievement, setAchievement] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchConfig = async () => {
//             try {
//                 const res = await api.get('/misc/config');
//                 // Find the specific achievement from the array using the ID from URL
//                 const found = res.data.achievements?.find((a: any) => a._id === id);
//                 setAchievement(found);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchConfig();
//     }, [id]);

//     // const getDriveImgUrl = (url: string) => {
//     //     if (!url) return '';
//     //     if (url.includes('drive.google.com')) {
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

//     if (loading) return <div className="text-white text-center pt-32">Loading...</div>;
//     if (!achievement) return <div className="text-white text-center pt-32">Achievement not found.</div>;

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen pt-24 pb-20 px-4 max-w-4xl mx-auto">

//                 {/* Back Button */}
//                 <Link to="/about" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
//                     <ArrowLeft size={16} className="mr-2" /> Back to About
//                 </Link>

//                 {/* Content Card */}
//                 <div className="glass-card overflow-hidden">

//                     {/* Header Image */}
//                     <div className="w-full h-64 md:h-80 bg-dark-200 relative">
//                         {achievement.image ? (
//                             <img src={getDriveImgUrl(achievement.image)} alt={achievement.title} className="w-full h-full object-cover" />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-green/20 to-transparent">
//                                 <Award size={64} className="text-neon-green/50" />
//                             </div>
//                         )}
//                         <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
//                     </div>

//                     <div className="p-8 relative -mt-10">
//                         {/* Title & Date */}
//                         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
//                             <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
//                                 {achievement.title}
//                             </h1>
//                             <div className="flex items-center gap-2 text-neon-green bg-neon-green/10 px-3 py-1 rounded-full w-fit">
//                                 <Calendar size={16} />
//                                 <span className="font-mono text-sm">{achievement.date}</span>
//                             </div>
//                         </div>

//                         <div className="w-full h-px bg-white/10 mb-8" />

//                         {/* Description */}
//                         <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed mb-8">
//                             <p className="whitespace-pre-line text-lg">{achievement.description}</p>
//                         </div>

//                         {/* Action Button (Certificate) */}
//                         {achievement.certificate && (
//                             <a
//                                 href={achievement.certificate}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="btn-neon inline-flex items-center gap-2"
//                             >
//                                 View Official Certificate <ExternalLink size={18} />
//                             </a>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AchievementDetails;