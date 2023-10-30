//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Cart = require('../../model/cart');

async function CartCreation(data) {
    const timestamp = new Date().getTime();

    const newCart = await Cart.create({
        generation_date: timestamp,
        is_closed: 0,
                
    });
    
    return newCart;
}

module.exports = CartAccess;