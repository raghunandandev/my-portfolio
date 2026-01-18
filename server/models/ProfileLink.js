// server/models/ProfileLink.js
const mongoose = require('mongoose');

const profileLinkSchema = mongoose.Schema({
    platform: { type: String, required: true }, // e.g., "LeetCode", "LinkedIn"
    url: { type: String, required: true },
    icon: { type: String }, // FontAwesome class or Image URL
    order: { type: Number, default: 0 }, // To sort them on frontend
    isCodingProfile: { type: Boolean, default: false } // To separate Socials vs Coding
});

module.exports = mongoose.model('ProfileLink', profileLinkSchema);