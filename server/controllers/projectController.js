const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    const projects = await Project.find({}).sort({ createdAt: -1 }); // Newest first
    res.json(projects);
};
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    const { title, description, techStack, liveLink, githubLink, imageUrl, category, featured } = req.body;

    const project = new Project({
        title,
        description,
        techStack,
        liveLink,
        githubLink,
        imageUrl,
        category,
        featured
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.techStack = req.body.techStack || project.techStack;
        project.liveLink = req.body.liveLink || project.liveLink;
        project.githubLink = req.body.githubLink || project.githubLink;
        project.imageUrl = req.body.imageUrl || project.imageUrl;
        project.featured = req.body.featured !== undefined ? req.body.featured : project.featured;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

module.exports = { getProjects, createProject, deleteProject, updateProject, getProjectById };