const express = require('express');
const CartAccess = require('./controller/cart_access');
const MerchAccess = require('./controller/merch_access');
const CartCreation = require('./controller/cart_creation');
const { LockDispenser, AddProduct } = require('./controller/product_addition');
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
            res.status(400).send('There is already a Cart open!');
        else
            res.status(201).json(new_cart);
    }  
    catch(error) {
        console.error('Error creating a Cart:', error);
        res.status(500).send('Error in creating a Cart. '+ error);
    }
});

/* INPUT
   - idcart: URL param
   - dispenser_id: query param
 */
// Add a product to the cart
shoppingRouter.put('/cart/:idcart/add', async (req, res) => {
    try {
        //the controller returns a bool value 
        let [ result, error ] = await AddProduct(req.uid, req.params.idcart, req.query.dispenser_id);
        
        if (result) res.status(200).send('All clear');
        else res.status(400).send(error);
    }
    catch(error) {
        res.status(500).send('An error occurred while adding a product to the cart. '+ error);
    }
});

// Scan of Merch and access to Digital label 
shoppingRouter.get('/dispenser/:iddispenser/scan', async (req, res) => {
    try {
        //access to Merchlot
        let merchlot = await MerchAccess(req.params.iddispenser, req.query.store_id)

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

// Lock the Dispenser before the Merch extraction
shoppingRouter.put('/dispenser/:iddispenser/lock', async (req, res) => {
    try {
        //the controller returns a bool value 
        let [ result, error ] = await LockDispenser(req.query.idstore, req.params.iddispenser);
        
        if (result) res.status(200).send('All clear');
        else res.status(400).send(error);
    }
    catch (error) {
        res.status(500).send('Error while locking a dispenser. '+ error);
    }
});

module.exports = shoppingRouter;