const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, deleteBlog, updateBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/:id').get(getBlogById).delete(protect, deleteBlog).put(protect, updateBlog);

module.exports = router;