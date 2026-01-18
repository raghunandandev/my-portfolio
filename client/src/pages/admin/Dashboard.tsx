import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    LayoutDashboard,
    Code2,
    Trophy,
    Terminal,
    ArrowUpRight,
    Download,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        dsa: 0,
        skills: 0,
        achievements: 0
    });
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);

    // New State for Report Generation
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/misc/dashboard-stats');
                setStats(res.data.counts);
                setGraphData(res.data.graphData);
            } catch (error) {
                console.error("Error loading dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // ✅ NEW: Function to Generate and Download a Text Report
    const handleGenerateReport = () => {
        setGenerating(true);

        // 1. Simulate a delay (for effect)
        setTimeout(() => {
            // 2. Create the Report Content
            const date = new Date().toLocaleString();
            const content = `
ADMIN PORTFOLIO REPORT
Generated on: ${date}
==========================================

SUMMARY STATISTICS:
-------------------
• Total Projects:    ${stats.projects}
• DSA Solved:        ${stats.dsa}
• Skills Listed:     ${stats.skills}
• Achievements:      ${stats.achievements}

SYSTEM STATUS:
--------------
• Database: Connected
• API Status: Online
• Admin: Authorized

==========================================
End of Report
        `.trim();

            // 3. Create a Blob (File) from the text
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);

            // 4. Create a hidden link and click it to trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `Portfolio_Report_${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();

            // 5. Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setGenerating(false);
        }, 1500); // 1.5 second simulated delay
    };

    // Custom Colors for the Bar Chart
    const colors = ['#00f2ff', '#bc13fe', '#0aff99', '#fbbf24'];

    const StatCard = ({ title, count, icon: Icon, color, delay }: any) => (
        <div
            className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            style={{ animationDelay: delay }}
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                <Icon size={80} />
            </div>
            <div className="relative z-10">
                <div className={`p-3 rounded-lg w-fit mb-4 ${color.replace('text-', 'bg-')}/10 ${color}`}>
                    <Icon size={24} />
                </div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
                <p className="text-4xl font-bold text-white">{count}</p>
            </div>
        </div>
    );

    if (loading) return <div className="p-10 text-white text-center">Loading Dashboard...</div>;

    return (
        <div className="space-y-8">

            {/* 1. Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, Admin. Here is your portfolio overview.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-neon-green bg-neon-green/10 px-4 py-2 rounded-full border border-neon-green/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                    </span>
                    System Online
                </div>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Projects"
                    count={stats.projects}
                    icon={LayoutDashboard}
                    color="text-neon-blue"
                />
                <StatCard
                    title="DSA Solved"
                    count={stats.dsa}
                    icon={Terminal}
                    color="text-neon-purple"
                />
                <StatCard
                    title="Total Skills"
                    count={stats.skills}
                    icon={Code2}
                    color="text-neon-green"
                />
                <StatCard
                    title="Achievements"
                    count={stats.achievements}
                    icon={Trophy}
                    color="text-yellow-400"
                />
            </div>

            {/* 3. Graph Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Chart */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <ArrowUpRight className="text-neon-blue" /> Content Analytics
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#6b7280"
                                    tick={{ fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    tick={{ fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {graphData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Quick Actions / Summary */}
                <div className="glass-card p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Quick Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">Database Status</span>
                                <span className="text-neon-green font-mono text-sm">Connected</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">Last Update</span>
                                <span className="text-white font-mono text-sm">Today</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">Portfolio Health</span>
                                <span className="text-neon-blue font-mono text-sm">98%</span>
                            </div>
                        </div>
                    </div>

                    {/* ✅ BUTTON WITH LOGIC */}
                    <button
                        onClick={handleGenerateReport}
                        disabled={generating}
                        className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-dashed border-white/20 hover:border-neon-blue transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {generating ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Download size={18} />
                                Download Report
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

// import { useEffect, useState } from 'react';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     Cell
// } from 'recharts';
// import {
//     LayoutDashboard,
//     Code2,
//     Trophy,
//     Award,
//     Terminal,
//     ArrowUpRight
// } from 'lucide-react';
// import api from '../../services/api';

// const Dashboard = () => {
//     const [stats, setStats] = useState({
//         projects: 0,
//         dsa: 0,
//         skills: 0,
//         achievements: 0
//     });
//     const [graphData, setGraphData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const res = await api.get('/misc/dashboard-stats');
//                 setStats(res.data.counts);
//                 setGraphData(res.data.graphData);
//             } catch (error) {
//                 console.error("Error loading dashboard stats", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, []);

//     // Custom Colors for the Bar Chart
//     const colors = ['#00f2ff', '#bc13fe', '#0aff99', '#fbbf24'];

//     const StatCard = ({ title, count, icon: Icon, color, delay }: any) => (
//         <div
//             className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
//             style={{ animationDelay: delay }}
//         >
//             <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
//                 <Icon size={80} />
//             </div>
//             <div className="relative z-10">
//                 <div className={`p-3 rounded-lg w-fit mb-4 ${color.replace('text-', 'bg-')}/10 ${color}`}>
//                     <Icon size={24} />
//                 </div>
//                 <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
//                 <p className="text-4xl font-bold text-white">{count}</p>
//             </div>
//         </div>
//     );

//     if (loading) return <div className="p-10 text-white text-center">Loading Dashboard...</div>;

//     return (
//         <div className="space-y-8">

//             {/* 1. Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
//                     <p className="text-gray-400">Welcome back, Admin. Here is your portfolio overview.</p>
//                 </div>
//                 <div className="hidden md:flex items-center gap-2 text-sm text-neon-green bg-neon-green/10 px-4 py-2 rounded-full border border-neon-green/20">
//                     <span className="relative flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
//                     </span>
//                     System Online
//                 </div>
//             </div>

//             {/* 2. Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard
//                     title="Total Projects"
//                     count={stats.projects}
//                     icon={LayoutDashboard}
//                     color="text-neon-blue"
//                 />
//                 <StatCard
//                     title="DSA Solved"
//                     count={stats.dsa}
//                     icon={Terminal}
//                     color="text-neon-purple"
//                 />
//                 <StatCard
//                     title="Total Skills"
//                     count={stats.skills}
//                     icon={Code2}
//                     color="text-neon-green"
//                 />
//                 <StatCard
//                     title="Achievements"
//                     count={stats.achievements}
//                     icon={Trophy}
//                     color="text-yellow-400"
//                 />
//             </div>

//             {/* 3. Graph Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                 {/* Main Chart */}
//                 <div className="lg:col-span-2 glass-card p-6">
//                     <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                         <ArrowUpRight className="text-neon-blue" /> Content Analytics
//                     </h3>
//                     <div className="h-[300px] w-full">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={graphData}>
//                                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//                                 <XAxis
//                                     dataKey="name"
//                                     stroke="#6b7280"
//                                     tick={{ fill: '#9ca3af' }}
//                                     axisLine={false}
//                                     tickLine={false}
//                                 />
//                                 <YAxis
//                                     stroke="#6b7280"
//                                     tick={{ fill: '#9ca3af' }}
//                                     axisLine={false}
//                                     tickLine={false}
//                                 />
//                                 <Tooltip
//                                     contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
//                                     itemStyle={{ color: '#fff' }}
//                                     cursor={{ fill: 'rgba(255,255,255,0.05)' }}
//                                 />
//                                 <Bar dataKey="value" radius={[4, 4, 0, 0]}>
//                                     {graphData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={colors[index % 20]} />
//                                     ))}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 {/* Recent Quick Actions / Summary */}
//                 <div className="glass-card p-6 flex flex-col justify-between">
//                     <div>
//                         <h3 className="text-xl font-bold text-white mb-4">Quick Summary</h3>
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
//                                 <span className="text-gray-400">Database Status</span>
//                                 <span className="text-neon-green font-mono text-sm">Connected</span>
//                             </div>
//                             <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
//                                 <span className="text-gray-400">Last Update</span>
//                                 <span className="text-white font-mono text-sm">Today</span>
//                             </div>
//                             <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
//                                 <span className="text-gray-400">Portfolio Health</span>
//                                 <span className="text-neon-blue font-mono text-sm">98%</span>
//                             </div>
//                         </div>
//                     </div>

//                     <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-dashed border-white/20 hover:border-neon-blue transition-all flex items-center justify-center gap-2">
//                         Generate Report (Mock)
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// const Dashboard = () => {
//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Stat Card 1 */}
//                 <div className="glass-card p-6 border-l-4 border-neon-blue">
//                     <h3 className="text-gray-400 text-sm uppercase">Total Visitors</h3>
//                     <p className="text-3xl font-bold mt-2">1,204</p>
//                 </div>

//                 {/* Stat Card 2 */}
//                 <div className="glass-card p-6 border-l-4 border-neon-purple">
//                     <h3 className="text-gray-400 text-sm uppercase">Projects</h3>
//                     <p className="text-3xl font-bold mt-2">8</p>
//                 </div>

//                 {/* Stat Card 3 */}
//                 <div className="glass-card p-6 border-l-4 border-neon-green">
//                     <h3 className="text-gray-400 text-sm uppercase">DSA Solved</h3>
//                     <p className="text-3xl font-bold mt-2">650+</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;