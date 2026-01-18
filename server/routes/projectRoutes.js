const express = require('express');

const router = express.Router();

const { getProjects, createProject, updateProject, deleteProject, getProjectById } = require('../controllers/projectController.js');

const {protect} = require('../middleware/authMiddleware.js');

router.route('/')
    .get(getProjects)
    .post(protect, createProject);

router.route('/:id')
    .delete(protect, deleteProject)
    .put(protect, updateProject);

router.get('/:id', getProjectById);

module.exports = router;   