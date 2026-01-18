import { motion } from 'framer-motion';

export interface TimelineItem {
    year: string;
    title: string;
    company: string;
    description: string;
}

const Timeline = ({ items }: { items: TimelineItem[] }) => {
    return (
        <div className="relative border-l border-white/10 ml-4 md:ml-10 space-y-12">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Neon Dot */}
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff]" />

                    <span className="text-neon-purple text-sm font-mono mb-1 block">
                        {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                        {item.title}
                    </h3>
                    <h4 className="text-gray-400 text-sm mb-2 font-semibold">
                        {item.company}
                    </h4>
                    <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;