import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { fetchBlogs, type BlogPost } from '../../services/blogService';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogList = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetchBlogs().then(setBlogs).catch(console.error);
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center">
                    Logs from my experiments in<span className="text-neon-purple">&nbsp;code, cloud, and creative technology.</span>
                </h1>

                <div className="grid gap-8">
                    {blogs.map((blog) => (
                        <Link key={blog._id} to={`/blog/${blog._id}`} className="block group">
                            <article className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:border-neon-purple/50 transition-all">
                                {/* Image */}
                                <div className="w-full md:w-64 h-48 bg-dark-200 rounded-lg overflow-hidden shrink-0">
                                    {blog.coverImage && (
                                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex gap-4 text-sm text-gray-400 mb-3">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime || '5 min read'}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-purple transition-colors">
                                        {blog.title}
                                    </h2>

                                    <p className="text-gray-400 mb-6 line-clamp-3 flex-1">
                                        {blog.description}
                                    </p>

                                    <div className="flex items-center text-neon-blue font-medium group-hover:translate-x-2 transition-transform">
                                        Read Article <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}

                    {blogs.length === 0 && (
                        <div className="text-center text-gray-500">No articles published yet.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogList;