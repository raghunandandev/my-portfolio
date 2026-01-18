const mongoose = require('mongoose');

const siteConfigSchema = mongoose.Schema({
    bio: {
        type: String,
        default: 'Full Stack Developer'
    },
    dsaSolved: {
        type: Number,
        default: 0,
    },
    resumeUrl: {
        type: String
    },
    profileImage: { type: String },
    skills: [{
        name: String,
        level: Number,
        icon: String
    }],
    timeline: [{
        year: String,
        title: String,     // e.g. "Senior Developer"
        company: String,   // e.g. "Google"
        description: String
      }],
    certifications: [{
        name: String,
        issuer: String, // e.g., Coursera, Udemy
        year: String,
        link: String
    }],

    // NEW: Coding Profiles
    codingProfiles: [{
        platform: String, // e.g., LeetCode, GitHub
        url: String,
        handle: String // e.g., @user123
      }],
    socials: [{
        platform: String, // e.g. "LinkedIn", "Twitter", "Instagram"
        url: String
      }],
    achievements: [{
        title: String,
        date: String,
        description: String,
        image: String,       // Thumbnail/Cover Image
        certificate: String  // URL to the certificate/proof
      }]
}, {timeStamp: true});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);