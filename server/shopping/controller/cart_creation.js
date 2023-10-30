const Cart = require('../../model/cart');

async function CartCreation(data) {
    // manipulate dates in the format YYYY-MM-DD, as it is the only one handled by MySQL DB
    const date = new Date().toISOString().split("T", 1)[0]; 

    const newCart = await Cart.create({
        generation_date: date,
        is_closed: 0
        //Here I'm thinking to change the FK since when I create a new Cart it would be necessary to set the 
        //Customer which it belongs and the Store where it is opened: 
        //FK of Customer
        //FK of Store        
    });
    
    return newCart;
}

module.exports = CartCreation;