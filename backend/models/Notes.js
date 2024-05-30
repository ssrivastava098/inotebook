const mongoose = require('mongoose');

// Create a schema for the Note
const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_collections',
        required: true,
    }, //This is added to associate notes with an individual user only so that other user aren't able to read their notes
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        default: "General",
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema and export it
const Notes = mongoose.model('Notes', NoteSchema);

module.exports = Notes;
