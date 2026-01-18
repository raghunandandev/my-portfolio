import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../../components/layout/Navbar';
import { fetchBlogById, type BlogPost } from '../../services/blogService';
import { ArrowLeft, Calendar } from 'lucide-react';

const BlogPostPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (id) fetchBlogById(id).then(setBlog).catch(console.error);
    }, [id]);

    if (!blog) return <div className="text-center pt-32">Loading...</div>;

    return (
        <>
            <Navbar />
            <article className="min-h-screen pt-24 pb-20 px-4 max-w-3xl mx-auto">

                <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
                    <ArrowLeft size={16} className="mr-2" /> Back to Blog
                </Link>

                {blog.coverImage && (
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-64 md:h-80 object-cover rounded-xl mb-8" />
                )}

                <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h1>

                <div className="flex items-center gap-4 text-gray-400 mb-8 border-b border-white/10 pb-8">
                    <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    {blog.tags.map(tag => (
                        <span key={tag} className="bg-white/5 px-2 py-1 rounded text-xs text-neon-blue">#{tag}</span>
                    ))}
                </div>

                {/* Markdown Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>

            </article>
        </>
    );
};

export default BlogPostPage;