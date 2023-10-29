const express = require('express');
const CustomerRegistration = require('./controller/registration');

const accountRouter = express.Router();

// Register a new customer
accountRouter.post('/create', async (req, res) => {
    try {
        let newCustomer = await CustomerRegistration(req.body);
        res.status(201).json(newCustomer);
    }
    catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'An error occurred while creating a customer.' });
    } 
});

// Protected routes
const ValidateToken = require('../auth/controller/validate');
const Customer = require('../model/customer');

accountRouter.get('/', ValidateToken, async (req, res) => {
    let customerData = await Customer.findOne({ where: { id: req.uid } });
    res.send('Ciao '+ customerData.name+ '!');
});

module.exports = accountRouter;