// server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }], // Array of strings e.g. ["React", "Node"]
  liveLink: { type: String },
  githubLink: { type: String },
  imageUrl: { type: String }, // Cloudinary URL
  category: { type: String, default: 'Web App' },
  featured: { type: Boolean, default: false }, // For "Featured Projects" section
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);