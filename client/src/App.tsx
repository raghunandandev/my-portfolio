import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import About from './pages/public/About'; // Make sure you have the placeholder or file for this
import ManageProjects from './pages/admin/ManageProjects';
import Contact from './pages/public/Contact';
import BlogList from './pages/public/BlogList';
import BlogPostPage from './pages/public/BlogPost';
import ManageBlog from './pages/admin/ManageBlog';
import ManageAbout from './pages/admin/ManageAbout';
import Footer from './components/layout/Footer';
import AchievementDetails from './pages/public/AchievementDetails';
import ProjectDetails from './pages/public/ProjectDetails';
import MyZone from './pages/public/MyZone';
import ManageZone from './pages/admin/ManageZone';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-dark text-white font-sans selection:bg-neon-blue selection:text-black">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:id" element={<BlogPostPage />} />
                        <Route path="/achievement/:id" element={<AchievementDetails />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        {/* Admin Authentication */}
                        <Route path="/admin/login" element={<Login />} />
                        <Route path="/my-zone" element={<MyZone />} />

                        {/* Protected Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            {/* We will add AddProject routes here next */}
                            <Route path="projects" element={<ManageProjects />} />
                            <Route path="blog" element={<ManageBlog />} />
                            <Route path="settings" element={<ManageAbout />} />
                            <Route path="zone" element={<ManageZone />} />
                            {/* <Route path="settings" element={<div>Settings (Coming Soon)</div>} /> */}

                        </Route>

                    </Routes>
                    {!window.location.pathname.startsWith('/admin') && <Footer />}
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Placeholder Imports (We will build these next)
// import Projects from './pages/public/Projects';
// const Home = () => <div className="p-10">Home Page (Coming Soon)</div>;
// const About = () => <div className="p-10">About Page</div>;
// const Dashboard = () => <div className="p-10">Admin Dashboard</div>;
// const Login = () => <div className="p-10">Admin Login</div>;

// function App() {
//     return (
//         <Router>
//             <div className="min-h-screen bg-dark text-white">
//                 {/* Navbar will go here */}
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/projects" element={<Projects />} />

//                     {/* Admin Routes */}
//                     <Route path="/admin/login" element={<Login />} />
//                     <Route path="/admin" element={<Dashboard />} />
//                 </Routes>
//                 {/* Footer will go here */}
//             </div>
//         </Router>
//     );
// }

// export default App;