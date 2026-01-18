const mongoose = require('mongoose');

const zoneItemSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['photo', 'poem'] // Limit to these two types
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, // Stores Image URL (for photo) or Poem Text (for poem)
        required: true,
    },
    description: {
        type: String, // Optional caption or context
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('ZoneItem', zoneItemSchema);