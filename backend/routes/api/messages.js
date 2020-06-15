const express = require('express');
const Message = require('../../models/Message');
const router = express.Router();
const moment = require('moment');
const auth = require('../../middleware/auth');
moment.locale('en-gb');

// Get all messages
// GET /api/messages
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    }
    catch (err) {
        res.send(err);
    }
})


//Post a new message
//POST /api/messages
router.post('/', auth, async (req, res) => {
    if (req.body == null) {
        res.status(400).send('error');
        return;
    };
    const { title, message, author } = req.body;
    const date = moment().format('LLL');
    const msg = new Message({ title, message, author, date });

    try {
        const save = await msg.save();
        res.json({ message: 'Data saved' });
    }
    catch (err) {
        res.status(400).send(err);
    }
})
module.exports = router;
