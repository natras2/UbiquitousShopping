const express = require('express');
const accountRouter = express.Router();

const Customer = require('../model/customer');

accountRouter.get('/', async (req, res) => {
    let customerData = await Customer.findByPk(req.uid);

    if (customerData == null)
        res.status(400).send("Customer not found");
    else
        res.status(200).json(customerData);
});

module.exports = accountRouter;