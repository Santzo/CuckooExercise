const mongoose = require('mongoose');

// Create a MongoDB schema for the messages
const MessageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    author: String,
    date: String
})

// Turn the schema into a model and export it
const messageModel = mongoose.model('Messages', MessageSchema);
module.exports = messageModel;