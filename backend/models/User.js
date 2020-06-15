const mongoose = require('mongoose');
const { model } = require('./Message');

// Create a MongoDB schema for the users
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Turn the schema into a model and export it
const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;