const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Middleware to check if a request is authenticated
function ValidateToken(req, res, next) {
    if (!req.header('Authorization')) return res.sendStatus(401); // Unauthorized

    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, out) => {
        if (err) {
            console.error(err);
            return res.sendStatus(403); // Forbidden
        } 
        
        if (out.type === 'Customer')
            req.uid = out.id;
        else if (out.type === 'SalesAssistant')
            req.said = out.id;

        next();
    });
}

module.exports = ValidateToken;