//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Cart = require('../../model/cart');
const Customer = require('../../model/customer');
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
    
    //const cart = await Cart.findOne({ where: { id: idcart } });
    //const products = await getProducts(idcart)
    
    //return {cart, products};
    return cart;
}

/*async function getProducts(idcart) {
    try {
          if (!idcart) {
          return null; //If cart has not been found
        }
    
        //const products = await cart.getProducts();
        const cart = await Cart.findOne({ where: { id: idcart }, include: Product });
        return cart.Product;
    } catch (error) {
        console.error('Error in finding the products contained in the Cart:', error);
        throw error;
    }
}*/

module.exports = CartAccess;