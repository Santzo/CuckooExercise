const jwt = require('jsonwebtoken');

//Authorization middleware
const auth = async (req, res, next) => {
    // Check for the auth token header
    const token = await req.header('x-auth-token');

    // If token not found send back error
    if (!token) {
        return res.status(401).json({ error: 'Authorization denied' })
    }

    // If token is found, check if its valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const emptyObject = Object.keys(req.body).length === 0;
        req.body = emptyObject ? decoded : { ...req.body, decoded };
        next();
    }
    catch (err) {
        return res.status(400).json({ error: 'Token invalid' });
    }
}
module.exports = auth;