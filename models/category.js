const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    }
}, {
    timestamps: true
});


exports.Category = mongoose.model('Category', categorySchema);