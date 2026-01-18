const ZoneItem = require('../models/ZoneItem');

// Public: Get all items
const getZoneItems = async (req, res) => {
    try {
        const items = await ZoneItem.find().sort({ date: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Add new item
// const addZoneItem = async (req, res) => {
//     try {
//         const { type, title, content, description } = req.body;
//         const newItem = await ZoneItem.create({ type, title, content, description });
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// const addZoneItem = async (req, res) => {
//     try {
//         const { type, title, description, content } = req.body;
//         let finalContent = content; // Default for poems

//         // If a file was uploaded, use its Cloudinary URL
//         if (req.file) {
//             finalContent = req.file.path;
//         }

//         const newItem = await ZoneItem.create({
//             type,
//             title,
//             content: finalContent,
//             description
//         });

//         res.status(201).json(newItem);
//     } catch (error) {
//         console.error("Error adding item:", error);
//         res.status(400).json({ message: error.message });
//     }
// };

// Admin: Add new item
const addZoneItem = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging
        console.log("Request File:", req.file); // Debugging

        const { type, title, description } = req.body;
        let finalContent = req.body.content; // Grab text content (for poems)

        // 1. If a file was uploaded via Multer/Cloudinary, use that URL
        if (req.file && req.file.path) {
            finalContent = req.file.path;
        }

        // 2. Validation Check: Content MUST exist
        if (!finalContent) {
            return res.status(400).json({ message: "Content is required (Image file or Poem text)" });
        }

        const newItem = await ZoneItem.create({
            type,
            title,
            content: finalContent, // This will now hold the Cloudinary URL or Poem text
            description
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(400).json({ message: error.message });
    }
};

const updateZoneItem = async (req, res) => {
    try {
        const { title, description, content, type } = req.body;
        const item = await ZoneItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update basic fields
        item.title = title || item.title;
        item.description = description || item.description;
        item.type = type || item.type;

        // Update Content logic
        // 1. If a new file is uploaded, use its path (Cloudinary URL)
        if (req.file && req.file.path) {
            item.content = req.file.path;
        }
        // 2. If it's a poem (no file), update content from text body
        else if (type === 'poem' && content) {
            item.content = content;
        }
        // 3. If it's a photo but no new file uploaded, keep existing item.content (do nothing)

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(400).json({ message: error.message });
    }
};
// Admin: Delete item
const deleteZoneItem = async (req, res) => {
    try {
        const item = await ZoneItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getZoneItems, addZoneItem, deleteZoneItem, updateZoneItem };