import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/auth/login', { username, password });
            login(data.token);
            navigate('/admin'); // Redirect to dashboard
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark text-white px-4">
            <div className="glass-card p-8 w-full max-w-md border-neon-blue/30 relative overflow-hidden">

                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.5)]" />

                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white/5 rounded-full text-neon-blue">
                        <Lock size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-dark/50 border border-white/10 rounded px-4 py-2 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-dark/50 border border-white/10 rounded px-4 py-2 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-neon py-2.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Enter Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;