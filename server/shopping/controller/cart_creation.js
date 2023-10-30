//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Cart = require('../../model/cart');

async function CartCreation(data) {
    const timestamp = new Date().getTime();

    const newCart = await Cart.create({
        generation_date: timestamp,
        is_closed: 0
        //Here I'm thinking to change the FK since when I create a new Cart it would be necessary to set the 
        //Customer which it belongs and the Store where it is opened: 
        //FK of Customer
        //FK of Store        
    });
    
    return newCart;
}

module.exports = CartAccess;