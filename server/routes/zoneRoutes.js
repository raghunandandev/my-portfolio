const express = require('express');
const router = express.Router();
const { getZoneItems, addZoneItem, deleteZoneItem, updateZoneItem } = require('../controllers/zoneController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getZoneItems);
router.post('/', protect, upload.single('image'), addZoneItem);
router.put('/:id', protect, upload.single('image'), updateZoneItem);
router.delete('/:id', protect, deleteZoneItem);

module.exports = router;