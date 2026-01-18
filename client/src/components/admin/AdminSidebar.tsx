import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Image
} from 'lucide-react';

const AdminSidebar = () => {
    const { logout } = useContext(AuthContext)!;
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
        { icon: Image, label: 'My Zone', path: '/admin/zone' },
        { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <>
            {/* ✅ MOBILE TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-dark-200 border border-white/10 rounded-md text-white shadow-lg hover:bg-neon-blue transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* ✅ BACKDROP (Closes sidebar on click) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                />
            )}

            {/* ✅ SIDEBAR */}
            <aside className={`
                fixed top-0 left-0 z-40 h-screen w-64 bg-dark-100/95 backdrop-blur-md border-r border-white/10 
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:flex md:flex-col
            `}>
                <div className="p-6 border-b border-white/10 flex items-center justify-center md:justify-start mt-14 md:mt-0">
                    <span className="text-xl font-bold tracking-tight text-neon-blue">
                        AdminPanel
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)} // Close menu on link click
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;