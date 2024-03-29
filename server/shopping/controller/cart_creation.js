const Cart = require('../../model/cart');

async function CartCreation(customer_id, store_id) {
    // manipulate dates in the format YYYY-MM-DD, as it is the only one handled by MySQL DB
    const date = new Date().toISOString().split("T", 1)[0];
    
    const open_cart = await Cart.findOne({
        where: {
            customer_id: customer_id,
            is_closed: false
        }
    })

    if(open_cart != null)
        return [null, open_cart.id];

    const new_cart = await Cart.create({
        generation_date: date,
        is_closed: false,
        customer_id: customer_id,
        store_id: store_id
    });
    
    return [new_cart];
}

module.exports = CartCreation;