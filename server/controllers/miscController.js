const Visitor = require('../models/Visitor');
const SiteConfig = require('../models/SiteConfig');
const Project = require('../models/Project');

// @desc    Track visitor
// @route   POST /api/misc/track-visitor
// @access  Public
const trackVisitor = async (req, res) => {
    // Simple IP tracking (In production, trust proxy if behind Nginx/Heroku)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let visitor = await Visitor.findOne({ ip });

    if (!visitor) {
        visitor = await Visitor.create({ ip });
        console.log(`New visitor tracked: ${ip}`);
    } else {
        // Update last visit time
        visitor.lastVisit = Date.now();
        await visitor.save();
    }

    res.status(200).json({ message: 'Visitor tracked' });
};

// @desc    Get visitor count
// @route   GET /api/misc/visitor-count
// @access  Public
const getVisitorCount = async (req, res) => {
    const count = await Visitor.countDocuments({});
    res.json({ count });
};

// @desc    Get Site Config (Bio, DSA, etc)
// @route   GET /api/misc/config
const getSiteConfig = async (req, res) => {
    // Find the first (and only) config doc, or create defaults if missing
    let config = await SiteConfig.findOne();
    if (!config) {
        config = await SiteConfig.create({});
    }
    res.json(config);
};

// @desc    Update DSA Solved Count
// @route   PUT /api/misc/dsa
// @access  Private/Admin
const updateDSA = async (req, res) => {
    const { dsaSolved } = req.body;
    let config = await SiteConfig.findOne();

    if (!config) config = await SiteConfig.create({});

    config.dsaSolved = dsaSolved;
    await config.save();
    res.json(config);
};

// @desc    Update Site Config (Bio, Skills, Timeline)
// @route   PUT /api/misc/config
// @access  Private/Admin
// const updateConfig = async (req, res) => {
//     const { bio, dsaSolved, skills, timeline, resumeUrl } = req.body;

//     let config = await SiteConfig.findOne();
//     if (!config) config = await SiteConfig.create({});

//     if (bio) config.bio = bio;
//     if (dsaSolved) config.dsaSolved = dsaSolved;
//     if (skills) config.skills = skills;
//     if (timeline) config.timeline = timeline;
//     if (resumeUrl) config.resumeUrl = resumeUrl;

//     const updatedConfig = await config.save();
//     res.json(updatedConfig);
// };

// @desc    Update Site Config
// @route   PUT /api/misc/config
const updateConfig = async (req, res) => {
    // Destructure all possible fields
    const { bio, dsaSolved, skills, timeline, resumeUrl, certifications, codingProfiles, profileImage, socials, achievements } = req.body;

    let config = await SiteConfig.findOne();
    if (!config) config = await SiteConfig.create({});

    // Update fields if they exist in request
    if (bio !== undefined) config.bio = bio;
    if (dsaSolved !== undefined) config.dsaSolved = dsaSolved;
    if (resumeUrl !== undefined) config.resumeUrl = resumeUrl;
    if (profileImage !== undefined) config.profileImage = profileImage;
    if (socials) config.socials = socials;
    if (achievements) config.achievements = achievements;

    // For arrays, we replace the entire array with the new one
    if (skills) config.skills = skills;
    if (timeline) config.timeline = timeline;
    if (certifications) config.certifications = certifications;
    if (codingProfiles) config.codingProfiles = codingProfiles;

    const updatedConfig = await config.save();
    res.json(updatedConfig);
};

const getDashboardStats = async (req, res) => {
    try {
        // 1. Fetch Counts
        const projectCount = await Project.countDocuments();

        // 2. Fetch Site Config Data
        const config = await SiteConfig.findOne();
        const skillCount = config?.skills?.length || 0;
        const achievementCount = config?.achievements?.length || 0;
        const dsaCount = config?.dsaSolved || 0;
        const certificationCount = config?.certifications?.length || 0;

        // 3. Prepare Data for Graphs
        const graphData = [
            { name: 'Projects', value: projectCount },
            { name: 'Skills', value: skillCount },
            { name: 'Awards', value: achievementCount },
            { name: 'Certs', value: certificationCount },
        ];

        res.json({
            counts: {
                projects: projectCount,
                dsa: dsaCount,
                skills: skillCount,
                achievements: achievementCount
            },
            graphData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dashboard stats" });
    }
  };
module.exports = { trackVisitor, getVisitorCount, getSiteConfig, updateDSA, updateConfig, getDashboardStats };