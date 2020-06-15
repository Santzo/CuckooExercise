const express = require('express');
const router = express.Router();
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');


// New user signing up logic
// /api/users/signup
router.post('/signup', async (req, res) => {

    // Destructure new user
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false });
    }
    const user = new User({ name, email, password });

    // Check if the user already exists in the database
    try {
        const userExists = await User.findOne({ $or: [{ name }, { email }] });
        if (userExists != null) {
            // If user already exists, check for conflicting user name // email
            const userNameTaken = userExists.name == name;
            const emailTaken = userExists.email == email;
            return res.status(400).json({ userNameTaken, emailTaken });
        }
    }
    catch (err) {
        return res.status(400).json({ success: false });
    }

    // Hash the password for database
    const hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
    const savedUser = await user.save();

    // Send back JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    console.log(token);
    res.json({ user, token });

})

// Login logic
// /api/users/login
router.post('/login', async (req, res) => {
    // Destructure the body
    const { name, password } = req.body;
    // Check if the user already exists in the database

    try {
        const dbUser = await User.findOne({ name });

        if (dbUser == null) {
            // If user doesnt exist, return not found
            return res.status(400).json({ msg: 'Username or password wrong' });
        }

        try {
            // Check for the password
            const rightPass = await bcrypt.compare(password, dbUser.password);
            // If incorrect password return status 400
            if (!rightPass) return res.status(400).json({ msg: 'Username or password wrong' });
            // Send back JWT token
            const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
            return res.json({ user: dbUser, token });
        }
        catch (err) {
            return res.status(400).json({ msg: 'Username or password wrong' });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Username or password wrong" });
    }


})
// Find a single user with ID
// /api/users/user
router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.body.id).select('-password');
    res.json(user);
});


module.exports = router;
