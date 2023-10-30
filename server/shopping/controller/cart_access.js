//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Cart = require('../../model/cart');


async function CartAccess(idcart) {
    const cart = await Cart.findOne({ where: { id: idcart } });
    
    // check if the cart exists
    //if (cart == null){
    //    return cart;}

    return cart;
}

module.exports = CartAccess;