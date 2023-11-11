const Cart = require('../../model/cart');
const Product = require('../../model/product');
const MerchLot = require('../../model/merchlot');
const Dispenser = require('../../model/dispenser');

async function CartAccess(uid, idcart) {
    const cart = await Cart.findOne({ 
        where: { 
            id: idcart,
            customer_id: uid
        }, 
        include: [{
            model: Product,
            include: [{
                model: MerchLot,
                attributes:['id'],
                include: [{
                    model: Dispenser,
                    attributes:['id'],
                }]
            }]
        }] 
    });
    
    return cart;
}

module.exports = CartAccess;