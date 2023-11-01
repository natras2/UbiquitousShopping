const express = require('express');
const accountRouter = express.Router();

const Customer = require('../model/customer');

accountRouter.get('/', async (req, res) => {
    let customerData = await Customer.findOne({ where: { id: req.uid } });
    res.send('Ciao '+ customerData.name+ '!');
});

module.exports = accountRouter;