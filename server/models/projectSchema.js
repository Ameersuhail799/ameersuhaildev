const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    technologies: [{
        type: String,
    }],
    liveLink: {
        type: String
    },
    githubRepo: {
        type: String
    },
    type: {
        type: String
    },
    scrollPreview: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },

}, { timestamps: true });

// Compound indexes for fast query execution and sorting under load
projectSchema.index({ category: 1, createdAt: -1 });
projectSchema.index({ isFeatured: 1, createdAt: -1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('project', projectSchema)