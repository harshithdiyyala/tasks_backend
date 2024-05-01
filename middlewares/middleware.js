// File: /middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // No token provided
    
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
         
        // Optionally, attach user to request if needed later
        req.user = await User.findById(decoded.id).select('-passwordHash');
        
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.sendStatus(403); // Invalid token
    }
};

module.exports = authenticateToken;
