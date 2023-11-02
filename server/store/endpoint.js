const express = require('express');
const { RefillDispenser, LockDispenser } = require('./controller/refill-dispenser');
const storeRouter = express.Router();

storeRouter.put('/:idstore/dispenser/:iddispenser/refill', async (req, res) => {
    try {
        //the controller returns a bool value 
        let [ result, error ] = await RefillDispenser(req.said, req.params.idstore, req.params.iddispenser, req.query.idmerchlot);
        
        if (result) res.status(200).send('All clear');
        else res.status(400).send(error);
    }
    catch (error) {
        res.status(500).send('Error while refilling a dispenser. '+ error);
    }
});

storeRouter.put('/:idstore/dispenser/:iddispenser/lock', async (req, res) => {
    try {
        //the controller returns a bool value 
        let [ result, error ] = await LockDispenser(req.params.idstore, req.params.iddispenser);
        
        if (result) res.status(200).send('All clear');
        else res.status(400).send(error);
    }
    catch (error) {
        res.status(500).send('Error while locking a dispenser. '+ error);
    }
});

module.exports = storeRouter;