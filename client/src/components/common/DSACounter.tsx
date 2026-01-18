import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const DSACounter = ({ target = 500 }: { target?: number }) => {
    // Spring animation for smooth counting
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const displayValue = useTransform(spring, (current) => Math.floor(current));

    useEffect(() => {
        spring.set(target);
    }, [target, spring]);

    return (
        <div className="glass-card p-6 flex flex-col items-center justify-center min-w-[200px] border-neon-purple/30">
            <motion.span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue font-mono">
                <motion.span>{displayValue}</motion.span>+
            </motion.span>
            <span className="text-gray-400 text-sm mt-2 uppercase tracking-widest">
                DSA Solved
            </span>
        </div>
    );
};

export default DSACounter;