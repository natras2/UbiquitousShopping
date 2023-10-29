const express = require('express');
const CustomerLogin = require('./controller/login');
const authRouter = express.Router();

// Log in and generate a JWT
authRouter.post('/login', async (req, res) => {
    try {
        let token = CustomerLogin(email, password);
        if (!token || token == null) {
            res.status(401).send('Authentication failed');
        } 
        else {
            res.status(200).json({ token });
        }
    } 
    catch(err) {
        res.status(500).send('Error authenticating customer. '+ err);
    }
});

module.exports = authRouter;