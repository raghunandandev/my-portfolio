const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    readTime:{
        type: String,
        default: "5 min read"
    },
    tags: [
        { type: String}
    ]
}, {timestamps :true});

module.exports = mongoose.model('Blog', blogSchema);