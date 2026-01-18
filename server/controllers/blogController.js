const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
    const { title, description, content, coverImage, tags } = req.body;

    const blog = new Blog({
        title,
        description,
        content,
        coverImage,
        tags,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;
        blog.content = req.body.content || blog.content;
        blog.coverImage = req.body.coverImage || blog.coverImage;
        blog.tags = req.body.tags || blog.tags;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, deleteBlog, updateBlog };