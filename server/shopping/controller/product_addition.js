const Cart = require('../../model/cart');
const Dispenser = require('../../model/dispenser');
const Product = require('../../model/product');

async function LockDispenser(store_id, dispenser_id) {
    const dispenser = await Dispenser.findOne({ 
        where: { 
            id: dispenser_id,
            store_id: store_id,
            is_locked: false
        }
    });
    if (!dispenser || dispenser == null)
        return [ false, "The dispenser doesn't exist or it is already in use"];
    
    dispenser.is_locked = true;
    await dispenser.save();

    return [ true ];
}

async function AddProduct(cart_id, dispenser_id) {
    const cart = await Cart.findOne({
        where: {
            id: cart_id,
            is_closed: false
        }
    });
    if (!cart || cart == null) 
        return [ false, "The cart doesn't exist or it is already close" ];

    const dispenser = await Dispenser.findOne({ 
        where: {
            id: dispenser_id,
            store_id: cart.store_id,
            is_locked: true,
        }
    });

    
}

module.exports = {
    LockDispenser,
    AddProduct
};