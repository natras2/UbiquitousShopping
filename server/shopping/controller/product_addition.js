const Cart = require('../../model/cart');
const Dispenser = require('../../model/dispenser');
const MerchLot = require('../../model/merchlot');
const Product = require('../../model/product');
const Merch = require('../../model/merch');

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

async function AddProduct(customer_id, cart_id, dispenser_id) {
    const cart = await Cart.findOne({
        where: {
            id: cart_id,
            is_closed: false,
            customer_id: customer_id
        }
    });
    if (!cart || cart == null) 
        return [ false, "The cart doesn't exist or it is already close" ];

    const dispenser = await Dispenser.findOne({ 
        where: {
            id: dispenser_id,
            store_id: cart.store_id,
            is_locked: true,
        },
        include: [{
            model: MerchLot,
            include: [{
                model: Merch
            }]
        }]
    });
    if (!dispenser || dispenser == null) 
        return [ false, "The dispenser doesn't exist or it is not locked" ];
    
    const read_weight_mock = (current_weight) => {
        //parse the input
        let max = parseFloat(current_weight);
        console.log('Max weight: '+ max +'g');

        return parseFloat(Math.random() * max).toFixed(3);
    };

    /**********************************
     * READ WEIGHT FROM WEIGHT SENSOR *
     **********************************/
    // For the only purpose of demo we read the weight from a function taking in input the max weight to allocate
    let weight = read_weight_mock(dispenser.current_weight); 
    console.log('Read weight: '+ weight +'g');

    let product_weight = dispenser.current_weight - weight;

    // create the instance of the product
    await Product.create({
        name: dispenser.MerchLot.Merch.name,
        weight: product_weight,
        price: (parseFloat(dispenser.MerchLot.Merch.price_per_milligram) * product_weight * 1000).toFixed(2),
        cart_id: cart_id,
        merchlot_id: dispenser.MerchLot.id
    });

    dispenser.is_locked = false;
    dispenser.current_weight = weight;
    await dispenser.save();
    
    return [ true ];

}

module.exports = {
    LockDispenser,
    AddProduct
};