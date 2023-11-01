const express = require('express');
const CartAccess = require('./controller/cart_access');
const MerchAccess = require('./controller/merch_access');
const shoppingRouter = express.Router();

//PROTECTED ROUTES

// Access to a Cart
shoppingRouter.get('/cart/:idcart', async (req, res) => {
    try {
        //access to Cart
        let cart = await CartAccess(req.params.idcart)

        if (cart == null) {
            res.status(404).send('Cart not found');
        } 
        else {
            res.status(200).json({ cart });
        }
    } 
    catch(err) {
        res.status(500).send('Error in accessing to Cart. '+ err);
    }
});

/*INPUT
Customer ID from ValidateToken (req.uid)
Store ID: query parameter (req.query.store_id)
*/
// Create a new Cart 
shoppingRouter.post('/cart/create', async (req, res) => {
    try {
        let new_cart = await CartCreation(req.uid, req.query.store_id);
        if (new_cart == null)
            res.status(400).send('There is already Cart open!');
        else
            res.status(201).json(new_cart);
    }  
    catch(error) {
        console.error('Error creating a Cart:', error);
        res.status(500).send('Error in creating a Cart. '+ error);
    }
});


// Scan of Merch and access to Digital label 
shoppingRouter.get('/dispenser/:iddispenser/scùan', async (req, res) => {
    try {
        //access to Merchlot
        let merchlot = await MerchAccess(req.body.iddispenser) //SET THE NAME OF THE FIELD REGARDING THE iddispenser

        if ( merchlot == null) {
            res.status(404).send('Merch not found');
        } 
        else {
            res.status(200).json({ merchlot });
        }
    } 
    catch(err) {
        res.status(500).send('Error in accessing to Merch. '+ err);
    }
});

module.exports = shoppingRouter;