const Cart = require("../../model/cart");
const Product = require("../../model/product");

async function CloseCart(customer_id, cart_id) {
    const cart = await Cart.findOne({
        where: {
            id: cart_id,
            customer_id: customer_id,
            is_closed: false
        },
        include: [{
            model: Product
        }]
    });
    if(cart === null)
        return null;

    let total = 0;
    cart.Products.forEach(item => {
        total += parseFloat(item.price);
    });

    if (total > 0) {
        cart.is_closed = true;
        await cart.save();
    }
    else {
        await cart.destroy();
    }
    
    return cart;
}

module.exports = CloseCart;