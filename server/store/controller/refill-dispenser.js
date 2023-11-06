const Dispenser = require("../../model/dispenser");
const Store = require("../../model/store");
const SalesAssistant = require("../../model/salesassistant");
const MerchLot = require("../../model/merchlot");
const { Op } = require("sequelize");

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

async function RefillDispenser(sa_id, store_id, dispenser_id, merchlot_id) {
    const dispenser = await Dispenser.findOne({ 
        where: {
            id: dispenser_id,
            store_id: store_id,
            is_locked: true,
        },
        include: [{ 
            model: Store, 
            include: [{
                model: SalesAssistant,
            }]
        }]
    });
 
    if (!dispenser || dispenser == null) 
        return [ false, "The dispenser doesn't exist or it is not locked" ];
    
    // check if the dispenser to modify is in the same store as the sales assistant
    let found = false;
    dispenser.Store.SalesAssistants.forEach(sa => {
        if (sa.id == sa_id) found = true;
    }); 
    if (!found) 
        return [ false, "The Sales Assistant is not authorized to perform this operation" ];
    
    // check if the istance of the current merchlot in dispenser is empty
    const merchlot = await MerchLot.findByPk(dispenser.merchlot_id);

    const read_weight_mock = (current_weight, merchlot_weight) => {
        //parse the input
        current_weight = parseFloat(current_weight);
        merchlot_weight = parseFloat(merchlot_weight);

        let min = current_weight;
        let max = Math.min((current_weight + merchlot_weight), 99999.999);

        console.log('Min weight: '+ min +'g');
        console.log('Max weight: '+ max +'g');

        return parseFloat(Math.random() * (max - min) + min).toFixed(3);
    };

    if (merchlot.quantity > 0) {
        console.log('Merch Lot remaining quantity: '+ merchlot.quantity + 'g');
        console.log('Current merch in the dispenser: ' + dispenser.current_weight + 'g');

        /**********************************
         * READ WEIGHT FROM WEIGHT SENSOR *
         **********************************/
        // For the only purpose of demo we read the weight from a function taking in input the interval weight to allocate
        let weight = read_weight_mock(dispenser.current_weight, merchlot.quantity); 
        console.log('Read weight: '+ weight +'g');

        merchlot.quantity -= (weight - dispenser.current_weight);
        await merchlot.save();

        dispenser.current_weight = weight;
    }
    else {
        // starts the provisioning of a quantity of another merch lot
        if (!merchlot_id || merchlot_id == null) 
            return [ false, "The id of the merch lot is mandatory as the Dispenser cannot be refilled with an istance of the latter merch lot" ];
        
        let new_merchlot = await MerchLot.findOne({
            where: {
                id: merchlot_id,
                quantity: { [Op.gt]: 0 },
                '$Store.id$': store_id,
                '$Dispenser.id$': null
            },
            include: [
                { model: Dispenser },
                { model: Store }
            ]
        });
        if (new_merchlot == null) 
            return [ false, "The selected merch lot is not suitable to be used" ];

        console.log('Merch Lot remaining quantity: '+ new_merchlot.quantity + 'g');
        console.log('Current merch in the dispenser: ' + dispenser.current_weight + 'g');

        /**********************************
         * READ WEIGHT FROM WEIGHT SENSOR *
         **********************************/
        // For the only purpose of demo we read the weight from a function taking in input the interval weight to allocate
        let weight = read_weight_mock(dispenser.current_weight, new_merchlot.quantity); 
        console.log('Read weight: '+ weight +'g');

        new_merchlot.quantity -= (weight - dispenser.current_weight);
        await new_merchlot.save();

        dispenser.merchlot_id = new_merchlot.id;
        dispenser.current_weight = weight;
    } 
    dispenser.is_locked = false;
    await dispenser.save();

    return [ true ];
}

module.exports = {
    RefillDispenser,
    LockDispenser
};