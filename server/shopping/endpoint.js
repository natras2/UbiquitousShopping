const express = require('express');
const CartAccess = require('./controller/cart_access');
const MerchAccess = require('./controller/merch_access');
const ValidateToken = require('../auth/controller/validate');
const shoppingRouter = express.Router();

//PROTECTED ROUTES

// Access to a Cart
shoppingRouter.get('/cart/:idcart', ValidateToken, async (req, res) => {
    try {
        //access to Cart
        let cart = await CartAccess(req.body.idcart) //SET THE NAME OF THE FIELD REGARDING THE IDCART

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


// Create a new Cart 
shoppingRouter.post('/cart/new', ValidateToken, async (req, res) => {
    try {
        let newCart = await CartCreation(req.body);
        res.status(201).json(newCart);
    }  
    catch(error) {
        console.error('Error creating customer:', error);
        res.status(500).send('Error in creating a Cart. '+ error);
    }
});


// Scan of Merch and access to Digital label 
shoppingRouter.get('/scan/:idmerchlot', ValidateToken, async (req, res) => {
    try {
        //access to Merchlot
        let merchlot = await MerchAccess(req.body.idmerchlot) //SET THE NAME OF THE FIELD REGARDING THE IDMERCHLOT

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