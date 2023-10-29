const express = require('express');
const CustomerRegistration = require('./controller/registration');

const accountRouter = express.Router();

// Register a new customer
accountRouter.post('/register', async (req, res) => {
    try {
        let newCustomer = CustomerRegistration(req.body);
        res.status(201).json(newCustomer);
    }
    catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'An error occurred while creating a customer.' });
    } 
});

// Protected routes
const ValidateToken = require('../auth/controller/validate');

accountRouter.get('/', ValidateToken, async (req, res) => {
    let customerData = await Customer.findOne({ where: { id: req.uid } });
    res.json(customerData);
});

module.exports = accountRouter;