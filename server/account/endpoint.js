const express = require('express');
const accountRouter = express.Router();

const Customer = require('../model/customer');
const SalesAssistant = require('../model/salesassistant');

accountRouter.get('/', async (req, res) => {
    let userData = (!!req.uid) 
        ? await Customer.findByPk(req.uid) 
        : (!!req.said) 
            ? await SalesAssistant.findByPk(req.said)
            : null;

    if (userData == null)
        res.status(400).send("User not found");
    else
        res.status(200).json(userData);
});

module.exports = accountRouter;