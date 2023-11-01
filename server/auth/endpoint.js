const express = require('express');
const CustomerLogin = require('./controller/login');
const CustomerRegistration = require('./controller/registration');
const authRouter = express.Router();

// Register a new customer
authRouter.post('/signup', async (req, res) => {
    try {
        let newCustomer = await CustomerRegistration(req.body);

        if (!newCustomer || newCustomer == null) 
            res.status(400).json({ error: 'The email address is already registered.' });
        else 
            res.status(201).json(newCustomer);
    }
    catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'An error occurred while creating a customer.' });
    } 
});

// Log in and generate a JWT
authRouter.post('/login', async (req, res) => {
    if (!req.body.email_address || !req.body.password) {
        res.status(400).send('Invalid request: email_address and password are required properties');
        return;
    }

    try {
        let token = await CustomerLogin(req.body.email_address, req.body.password);
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