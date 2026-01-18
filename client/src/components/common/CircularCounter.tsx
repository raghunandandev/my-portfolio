import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const CircularCounter = ({ target = 0, label = "DSA Problems" }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(0);

    // Animate number
    const spring = useSpring(0, { bounce: 0, duration: 2500 });
    const displayValue = useTransform(spring, (current) => Math.floor(current));

    useEffect(() => {
        spring.set(target);
        // Animate circle fill (approximate based on target, e.g., max 1000)
        const maxVal = 1000;
        const fill = Math.min(target / maxVal, 1) * 100;
        setProgress(fill);
    }, [target, spring]);

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center w-64 h-64">
            {/* SVG Circle */}
            <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
                {/* Background Circle */}
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="10"
                    fill="transparent"
                />
                {/* Animated Progress Circle */}
                <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="#bc13fe" // Neon Purple
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]"
                />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span className="text-5xl font-bold text-white font-mono">
                    {displayValue}
                </motion.span>
                <span className="text-sm text-gray-400 uppercase tracking-widest mt-2">{label}</span>
            </div>

            {/* Decorative Rotating Ring */}
            <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow w-full h-full pointer-events-none" />
        </div>
    );
};

export default CircularCounter;