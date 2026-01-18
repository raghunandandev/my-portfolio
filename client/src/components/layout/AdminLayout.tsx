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