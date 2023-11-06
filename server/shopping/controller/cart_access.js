//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Cart = require('../../model/cart');
const Product = require('../../model/product');

async function CartAccess(idcart) {
    const cart = await Cart.findOne({ 
        where: { 
            id: idcart 
        }, 
        include: [{
            model: Product
        }] 
    });
    
    return cart;
    
    /*const result = {
        id: cart.id,
        idcust: cart.customer_id,
        idstore: cart.store_id,
        idproduct: cart.Product.id,
        name: cart.Product.name,
        weight: cart.Product.weight,
        price: cart.Product.price
    }
    return result;*/
}

module.exports = CartAccess;