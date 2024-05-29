const mongoose = require('mongoose');

// Create a schema for the User
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // This field is required
        trim: true // Removes whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        lowercase: true, // Converts email to lowercase
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Email validation
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Sets the default value to the current date
    }
});

// Create a model from the schema and export it
const User = mongoose.model('User', UserSchema);

module.exports = User;
