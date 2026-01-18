const express = require('express');
const router = express.Router();
const { trackVisitor, getVisitorCount, getSiteConfig, updateDSA, updateConfig, getDashboardStats} = require('../controllers/miscController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/track-visitor', trackVisitor);
router.get('/visitor-count', getVisitorCount);
router.get('/config', getSiteConfig);
router.put('/dsa', protect, updateDSA);
router.put('/config', protect, updateConfig);
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;