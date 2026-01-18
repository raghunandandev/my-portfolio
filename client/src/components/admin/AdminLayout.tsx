// import { useContext } from 'react';
// import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { LayoutDashboard, FolderKanban, FileText, Settings, LogOut,  } from 'lucide-react';

// const AdminLayout = () => {
//     const { isAuthenticated, logout } = useContext(AuthContext)!;
//     const location = useLocation();

//     if (!isAuthenticated) {
//         return <Navigate to="/admin/login" replace />;
//     }

//     const navItems = [
//         { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
//         { icon: <FolderKanban size={20} />, label: 'Projects', path: '/admin/projects' },
//         { icon: <FileText size={20} />, label: 'Blog Posts', path: '/admin/blog' },
//         { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
//         { icon: Image, label: 'My Zone', path: '/admin/zone' },
//     ];

//     return (
//         <div className="flex h-screen bg-dark text-white">
//             {/* Sidebar */}
//             <aside className="w-64 border-r border-white/10 bg-dark-100/50 hidden md:flex flex-col">
//                 <div className="p-6 border-b border-white/10">
//                     <span className="text-xl font-bold tracking-tight text-neon-blue">
//                         AdminPanel
//                     </span>
//                 </div>

//                 <nav className="flex-1 p-4 space-y-2">
//                     {navItems.map((item) => (
//                         <Link
//                             key={item.path}
//                             to={item.path}
//                             className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
//                                     ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
//                                     : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                 }`}
//                         >
//                             {item.icon}
//                             <span className="font-medium">{item.label}</span>
//                         </Link>
//                     ))}
//                 </nav>

//                 <div className="p-4 border-t border-white/10">
//                     <button
//                         onClick={logout}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
//                     >
//                         <LogOut size={20} />
//                         Logout
//                     </button>
//                 </div>
//             </aside>

//             {/* Main Content Area */}
//             <main className="flex-1 overflow-auto bg-dark p-8">
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default AdminLayout;

// import { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import AdminSidebar from '../components/layout/AdminSidebar'; // Adjust path if needed

// const AdminLayout = () => {
//     const { isAuthenticated } = useContext(AuthContext)!;

//     if (!isAuthenticated) {
//         return <Navigate to="/admin/login" replace />;
//     }

//     return (
//         <div className="flex h-screen bg-dark text-white overflow-hidden">
//             {/* ✅ Responsive Sidebar Component */}
//             <AdminSidebar />

//             {/* Main Content Area */}
//             {/* Added pt-16 on mobile to prevent content from hiding behind the toggle button */}
//             <main className="flex-1 overflow-auto bg-dark p-4 md:p-8 pt-16 md:pt-8">
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default AdminLayout;

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar'; // Import the new sidebar

const AdminLayout = () => {
    const { isAuthenticated } = useContext(AuthContext)!;

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex h-screen bg-dark text-white overflow-hidden">

            {/* ✅ Render the Responsive Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            {/* Added top padding on mobile (pt-16) so content isn't hidden behind the toggle button */}
            <main className="flex-1 overflow-auto bg-dark p-4 md:p-8 pt-16 md:pt-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;