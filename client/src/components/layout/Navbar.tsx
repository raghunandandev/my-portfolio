import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '/blog' },
        { name: 'My Zone', path: '/my-zone' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-dark/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Terminal className="text-neon-blue w-8 h-8" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tighter">
                        DEV<span className="text-neon-purple">.PORTFOLIO</span>
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Desktop Menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white/10 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="block py-2 px-3 text-gray-300 hover:text-neon-blue transition-colors duration-300 md:p-0"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;