import { useEffect, useState } from 'react';
import { Image, Feather, Loader2, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import api from '../../services/api';

// --- Types ---
interface ZoneItem {
    _id: string;
    type: 'photo' | 'poem';
    title: string;
    content: string;
    description?: string;
    date: string;
}

// --- Helper Component for Individual Cards ---
const ZoneItemCard = ({ item }: { item: ZoneItem }) => {
    const [showDescription, setShowDescription] = useState(false);

    // Helper for Drive Images
    const getDriveImgUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (idMatch && idMatch[1]) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
        }
        return url;
    };

    return (
        <div className="break-inside-avoid glass-card overflow-hidden hover:border-neon-purple/50 transition-colors mb-6">

            {/* === PHOTO TYPE === */}
            {item.type === 'photo' ? (
                <div>
                    <div className="relative group">
                        <img
                            src={getDriveImgUrl(item.content)}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-full text-blue-400 border border-white/10">
                            <Image size={16} />
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <span className="text-[10px] text-gray-500 border border-white/10 px-2 py-1 rounded bg-white/5 whitespace-nowrap">
                                {new Date(item.date).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Photos always show description if present */}
                        {item.description && (
                            <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3 mt-2">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                /* === POEM TYPE (Updated Layout) === */
                <div className="p-6 relative bg-gradient-to-b from-white/5 to-transparent">
                    <div className="absolute top-4 right-4 text-neon-purple/20">
                        <Feather size={40} />
                    </div>

                    {/* 1. Title */}
                    <h3 className="text-xl font-bold text-white mb-4 inline-block relative z-10 border-b border-white/10 pb-2">
                        {item.title}
                    </h3>

                    {/* 2. Poem Content (Visible First) */}
                    <div className="text-gray-200 font-serif whitespace-pre-line leading-relaxed mb-4 text-lg pl-4 border-l-2 border-neon-purple/30">
                        {item.content}
                    </div>

                    {/* 3. See More / Description Toggle */}
                    {item.description && (
                        <div className="mt-4">
                            <button
                                onClick={() => setShowDescription(!showDescription)}
                                className="text-xs font-bold text-neon-purple hover:text-white flex items-center gap-1 mb-2 transition-colors"
                            >
                                {showDescription ? (
                                    <>Hide Insight <ChevronUp size={12} /></>
                                ) : (
                                    <>See Insight <ChevronDown size={12} /></>
                                )}
                            </button>

                            {/* Conditional Description */}
                            {showDescription && (
                                <div className="text-sm text-gray-400 italic bg-white/5 p-3 rounded border border-white/5 animate-fade-in">
                                    "{item.description}"
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. Footer */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-6 pt-4 border-t border-white/5">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} /> {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span className="text-neon-purple font-mono">Poetry</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Page Component ---
const MyZone = () => {
    const [items, setItems] = useState<ZoneItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'photo' | 'poem'>('all');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get('/zone');
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching zone items", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredItems = filter === 'all' ? items : items.filter(i => i.type === filter);

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 bg-dark px-4">
                <div className="container mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            My <span className="text-neon-purple">Zone</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A curated collection of my captured moments and poetic musings.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex justify-center gap-4 mb-12">
                        {['all', 'photo', 'poem'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-6 py-2 rounded-full capitalize transition-all border ${filter === f
                                        ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.4)]'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-neon-purple/50'
                                    }`}
                            >
                                {f}s
                            </button>
                        ))}
                    </div>

                    {/* Content Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-neon-purple" size={40} /></div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {filteredItems.map((item) => (
                                <ZoneItemCard key={item._id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default MyZone;