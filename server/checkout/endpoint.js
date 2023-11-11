const express = require('express');
const CloseCart = require('./controller/cart_close');
const checkoutRouter = express.Router();

checkoutRouter.put('/close/:idcart', async (req, res) => {
    try {
        const result = await CloseCart(req.uid, req.params.idcart);
        if (!result || result == null)
            res.status(404).send('The cart doesn\'t exist');
        else 
            res.status(200).send('All clear');
    }
    catch (error) {
        res.status(500).send('An error occurred while closing the cart. '+ error);
    }
})

module.exports = checkoutRouter;