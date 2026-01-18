import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import api from '../../services/api';
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        try {
            await api.post('/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto flex items-center">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

                    {/* Left Side: Contact Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Let's <span className="text-neon-blue">Connect</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Ideas move fast. Let’s sync, collaborate, and ship something meaningful.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/5 rounded-lg text-neon-purple">
                                    <Mail size={24} />
                                </div>
                                <span>raghunandandevsingh@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/5 rounded-lg text-neon-blue">
                                    <MapPin size={24} />
                                </div>
                                <span>Haryana, India</span>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/5 rounded-lg text-neon-green">
                                    <Phone size={24} />
                                </div>
                                <span>+91 8130323863</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="glass-card p-8 border-neon-blue/20">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-neon py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>Sending... <Loader2 className="animate-spin" size={20} /></>
                                ) : (
                                    <>Send Message <Send size={20} /></>
                                )}
                            </button>

                            {status === 'success' && (
                                <p className="text-neon-green text-center text-sm mt-2">
                                    Message sent successfully! I'll get back to you soon.
                                </p>
                            )}

                            {status === 'error' && (
                                <p className="text-red-400 text-center text-sm mt-2">
                                    Something went wrong. Please try again later.
                                </p>
                            )}

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;