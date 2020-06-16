const express = require('express');
const expressApp = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') const env = require('dotenv');
const path = require('path');
const auth = require('./middleware/auth');
env.config();

const options = {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// Connect to the Mongo DB Atlas, using enviroment variables
mongoose.connect(process.env.DATABASE_URL, options);
const db = mongoose.connection;
db.on('error', () => console.log('error'));
db.once('open', () => console.log('Connected to the database'));

// Both express.json() and express.urlencoded are needed to handle POST / PUT requests
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    expressApp.use(express.static('../frontend/build'));
    expressApp.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
    });
}
// Routes
expressApp.use('/api/messages', require('./routes/api/messages'));
expressApp.use('/api/users', require('./routes/api/users'));

// Listen to the port
expressApp.listen(PORT, () => console.log('The server is running...'));
