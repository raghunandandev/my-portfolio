import { motion } from 'framer-motion';

export interface Skill {
    name: string;
    level: number;
    category: string;
}

const Skills = ({ skills }: { skills: Skill[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-4 text-center hover:border-neon-purple/50 transition-colors"
                >
                    <h4 className="font-bold text-white mb-2">{skill.name}</h4>
                    <div className="w-full bg-dark-200 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                        />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 block">{skill.level}%</span>
                </motion.div>
            ))}
        </div>
    );
};

export default Skills;