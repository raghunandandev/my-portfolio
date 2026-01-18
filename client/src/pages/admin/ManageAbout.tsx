import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import api from '../../services/api';

interface Achievement {
    _id?: string; // Mongoose adds this automatically
    title: string;
    date: string;
    description: string;
    image: string;
    certificate: string;
  }

// Types matches our Mongoose Schema
interface SiteConfig {
    bio: string;
    profileImage: string;
    resumeUrl: string;
    socials: { platform: string; url: string }[];
    timeline: { year: string; title: string; company: string; description: string }[];
    skills: { name: string; level: number; category: string }[];
    certifications: { name: string; issuer: string; year: string; link: string }[];
    codingProfiles: { platform: string; url: string; handle: string }[];
    achievements: Achievement[];
}

const ManageAbout = () => {
    const [data, setData] = useState<SiteConfig>({
        bio: '',
        profileImage: '',
        resumeUrl: '',
        socials: [],
        timeline: [],
        skills: [],
        certifications: [],
        codingProfiles: [],
        achievements: []
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Fetch Data on Load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/misc/config');
                // Ensure arrays exist even if DB returns undefined
                setData({
                    ...res.data,
                    profileImage: res.data.profileImage || '',
                    resumeUrl: res.data.resumeUrl || '',
                    socials: res.data.socials || [],
                    timeline: res.data.timeline || [],
                    skills: res.data.skills || [],
                    certifications: res.data.certifications || [],
                    codingProfiles: res.data.codingProfiles || [],
                    achievements: res.data.achievements || []
                });
            } catch (err) {
                console.error(err);
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, []);

    // Generic Handler for Text Inputs
    const handleChange = (field: string, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    // Helper: Add Item to Array
    const addItem = (field: keyof SiteConfig, item: any) => {
        setData(prev => ({
            ...prev,
            [field]: [...(prev[field] as any[]), item]
        }));
    };

    // Helper: Remove Item from Array
    const removeItem = (field: keyof SiteConfig, index: number) => {
        setData(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).filter((_, i) => i !== index)
        }));
    };

    // Helper: Update Item in Array
    const updateItem = (field: keyof SiteConfig, index: number, key: string, value: any) => {
        const newArray = [...(data[field] as any[])];
        newArray[index][key] = value;
        setData(prev => ({ ...prev, [field]: newArray }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.put('/misc/config', data);
            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to update.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-10">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Edit Profile & About</h1>
                <button onClick={handleSave} disabled={loading} className="btn-neon flex items-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} Save Changes
                </button>
            </div>

            <div className="space-y-8">
                {/* 0. PROFILE IMAGE */}
                <section className="glass-card p-6">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">Profile Image</h2>
                    <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-dark-200 border border-white/10 shrink-0">
                            {data.profileImage ? (
                                <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Img</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                className="w-full bg-dark/50 border border-white/10 rounded p-2 text-white focus:border-neon-blue outline-none"
                                value={data.profileImage}
                                onChange={(e) => handleChange('profileImage', e.target.value)}
                            />
                        </div>
                    </div>
                </section>
                {/* ADD THIS SECTION IN THE JSX (Below Profile Image Section) */}
                <section className="glass-card p-6">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">Resume Settings</h2>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Resume PDF URL</label>
                        <input
                            type="text"
                            placeholder="https://example.com/my-resume.pdf"
                            className="w-full bg-dark/50 border border-white/10 rounded p-2 text-white focus:border-neon-blue outline-none"
                            value={data.resumeUrl}
                            onChange={(e) => handleChange('resumeUrl', e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            *Tip: Use a direct link to a PDF file. If using Google Drive, make sure it is public and use a direct embed link.*
                        </p>
                    </div>
                </section>

                {/* 1. BIO SECTION */}
                <section className="glass-card p-6">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">Biography</h2>
                    <textarea
                        rows={5}
                        className="w-full bg-dark/50 border border-white/10 rounded p-3 text-white focus:border-neon-blue outline-none"
                        value={data.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                    />
                </section>

                {/* 2. TIMELINE SECTION */}
                <section className="glass-card p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-neon-purple">Experience Timeline</h2>
                        <button onClick={() => addItem('timeline', { year: '', title: '', company: '', description: '' })} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                            + Add Experience
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.timeline.map((item, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-dark/30 p-4 rounded relative">
                                <input placeholder="Year" className="md:col-span-2 bg-dark border border-white/10 p-2 rounded text-white" value={item.year} onChange={e => updateItem('timeline', i, 'year', e.target.value)} />
                                <input placeholder="Title" className="md:col-span-3 bg-dark border border-white/10 p-2 rounded text-white" value={item.title} onChange={e => updateItem('timeline', i, 'title', e.target.value)} />
                                <input placeholder="Company" className="md:col-span-3 bg-dark border border-white/10 p-2 rounded text-white" value={item.company} onChange={e => updateItem('timeline', i, 'company', e.target.value)} />
                                <input placeholder="Description" className="md:col-span-4 bg-dark border border-white/10 p-2 rounded text-white" value={item.description} onChange={e => updateItem('timeline', i, 'description', e.target.value)} />
                                <button onClick={() => removeItem('timeline', i)} className="absolute -top-2 -right-2 bg-red-500/80 p-1 rounded-full text-white"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. SKILLS SECTION */}
                <section className="glass-card p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-neon-green">Technical Skills</h2>
                        <button onClick={() => addItem('skills', { name: '', level: 50, category: 'Web' })} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                            + Add Skill
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.skills.map((item, i) => (
                            <div key={i} className="flex gap-2 bg-dark/30 p-3 rounded relative">
                                <input placeholder="Skill Name" className="flex-1 bg-dark border border-white/10 p-2 rounded text-white" value={item.name} onChange={e => updateItem('skills', i, 'name', e.target.value)} />
                                <input type="number" placeholder="%" className="w-16 bg-dark border border-white/10 p-2 rounded text-white" value={item.level} onChange={e => updateItem('skills', i, 'level', parseInt(e.target.value))} />
                                <button onClick={() => removeItem('skills', i)} className="text-red-400 p-2"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. CERTIFICATIONS */}
                <section className="glass-card p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-yellow-400">Certifications</h2>
                        <button onClick={() => addItem('certifications', { name: '', issuer: '', year: '', link: '' })} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                            + Add Cert
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.certifications.map((item, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-dark/30 p-4 rounded relative">
                                <input placeholder="Certificate Name" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.name} onChange={e => updateItem('certifications', i, 'name', e.target.value)} />
                                <input placeholder="Issuer (e.g. Udemy)" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.issuer} onChange={e => updateItem('certifications', i, 'issuer', e.target.value)} />
                                <input placeholder="Year" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.year} onChange={e => updateItem('certifications', i, 'year', e.target.value)} />
                                <input placeholder="Verification Link" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.link} onChange={e => updateItem('certifications', i, 'link', e.target.value)} />
                                <button onClick={() => removeItem('certifications', i)} className="absolute -top-2 -right-2 bg-red-500/80 p-1 rounded-full text-white"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CODING PROFILES */}
                <section className="glass-card p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-pink-500">Coding Profiles</h2>
                        <button onClick={() => addItem('codingProfiles', { platform: '', url: '', handle: '' })} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                            + Add Profile
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.codingProfiles.map((item, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-dark/30 p-4 rounded relative">
                                <input placeholder="Platform (LeetCode)" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.platform} onChange={e => updateItem('codingProfiles', i, 'platform', e.target.value)} />
                                <input placeholder="Username/Handle" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.handle} onChange={e => updateItem('codingProfiles', i, 'handle', e.target.value)} />
                                <input placeholder="Profile URL" className="bg-dark border border-white/10 p-2 rounded text-white" value={item.url} onChange={e => updateItem('codingProfiles', i, 'url', e.target.value)} />
                                <button onClick={() => removeItem('codingProfiles', i)} className="absolute -top-2 -right-2 bg-red-500/80 p-1 rounded-full text-white"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </section>
                {/* 6. SOCIAL MEDIA (FOOTER) */}
                <section className="glass-card p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-blue-400">Footer Social Links</h2>
                        <button onClick={() => addItem('socials', { platform: 'LinkedIn', url: '' })} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                            + Add Link
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.socials.map((item, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-dark/30 p-4 rounded relative">
                                <select
                                    className="bg-dark border border-white/10 p-2 rounded text-white"
                                    value={item.platform}
                                    onChange={e => updateItem('socials', i, 'platform', e.target.value)}
                                >
                                    <option>LinkedIn</option>
                                    <option>GitHub</option>
                                    <option>Twitter</option>
                                    <option>Instagram</option>
                                    <option>Facebook</option>
                                    <option>YouTube</option>
                                </select>
                                <input
                                    placeholder="Profile URL"
                                    className="bg-dark border border-white/10 p-2 rounded text-white"
                                    value={item.url}
                                    onChange={e => updateItem('socials', i, 'url', e.target.value)}
                                />
                                <button onClick={() => removeItem('socials', i)} className="absolute -top-2 -right-2 bg-red-500/80 p-1 rounded-full text-white"><Trash2 size={14} /></button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* DSA COUNTER SETTING */}
                <section className="glass-card p-6 mt-8 border-neon-blue/30">
                    <h2 className="text-xl font-bold text-white mb-4">Hero Stats</h2>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Total DSA Problems Solved</label>
                        <input
                            type="number"
                            className="bg-dark border border-white/10 p-2 rounded text-white w-full md:w-1/3"
                            value={data.dsaSolved}
                            onChange={e => handleChange('dsaSolved', parseInt(e.target.value))}
                        />
                    </div>
                </section>
                {/* 7. ACHIEVEMENTS SECTION */}
                <section className="glass-card p-6 border-neon-green/30">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold text-neon-green">Achievements & Awards</h2>
                        <button
                            onClick={() => addItem('achievements', { title: '', date: '', description: '', image: '', certificate: '' })}
                            className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20"
                        >
                            + Add Achievement
                        </button>
                    </div>
                    <div className="space-y-6">
                        {data.achievements.map((item, i) => (
                            <div key={i} className="bg-dark/30 p-4 rounded relative border border-white/5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <input
                                        placeholder="Achievement Title"
                                        className="bg-dark border border-white/10 p-2 rounded text-white font-bold"
                                        value={item.title}
                                        onChange={e => updateItem('achievements', i, 'title', e.target.value)}
                                    />
                                    <input
                                        placeholder="Date (e.g., Dec 2025)"
                                        className="bg-dark border border-white/10 p-2 rounded text-white"
                                        value={item.date}
                                        onChange={e => updateItem('achievements', i, 'date', e.target.value)}
                                    />
                                </div>

                                <textarea
                                    placeholder="Description..."
                                    rows={2}
                                    className="w-full bg-dark border border-white/10 p-2 rounded text-white mb-3"
                                    value={item.description}
                                    onChange={e => updateItem('achievements', i, 'description', e.target.value)}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        placeholder="Image URL (Cover)"
                                        className="bg-dark border border-white/10 p-2 rounded text-white"
                                        value={item.image}
                                        onChange={e => updateItem('achievements', i, 'image', e.target.value)}
                                    />
                                    <input
                                        placeholder="Certificate URL (Link)"
                                        className="bg-dark border border-white/10 p-2 rounded text-white"
                                        value={item.certificate}
                                        onChange={e => updateItem('achievements', i, 'certificate', e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={() => removeItem('achievements', i)}
                                    className="absolute -top-2 -right-2 bg-red-500/80 p-1.5 rounded-full text-white hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ManageAbout;