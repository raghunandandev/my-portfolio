const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    lastVisit: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);

