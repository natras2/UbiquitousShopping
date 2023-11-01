const express = require('express');
const RefillDispenser = require('./controller/refill-dispenser');
const storeRouter = express.Router();

storeRouter.put('/:idstore/refill-dispenser/:iddispenser', async (req, res) => {
    try {
        //the controller returns a bool value 
        let [ result, error ] = await RefillDispenser(req.params.idstore, req.params.iddispenser, req.query.idmerchlot);
        
        if (result) res.status(200);
        else res.status(400).send(error);
    }
    catch (error) {
        res.status(500).send('Error while refilling a dispenser. '+ error);
    }
});

module.exports = storeRouter;