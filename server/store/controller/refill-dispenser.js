const Dispenser = require("../../model/dispenser");
const Store = require("../../model/store");
const SalesAssistant = require("../../model/salesassistant");
const MerchLot = require("../../model/merchlot");
const { Op } = require("sequelize");

async function RefillDispenser(sa_id, store_id, dispenser_id, merchlot_id) {
    const dispenser = await Dispenser.findOne({ 
        where: {
            id: dispenser_id,
            is_locked: true,
            store_id: store_id,
        },
        include: [{ 
            model: Store, 
            include: [{
                model: SalesAssistant,
            }]
        }]
    });
 
    if (!dispenser || dispenser == null) return [ false, "The dispenser doesn't exist" ];
    
    // check if the dispenser to modify is in the same store as the sales assistant
    let found = false;
    dispenser.Store.SalesAssistants.forEach(sa => {
        if (sa.id == sa_id) found = true;
    }); 
    if (!found) return [ false, "The Sales Assistant is not authorized to perform this operation" ];
    
    // check if the istance of the current merchlot in dispenser is empty
    const merchlot = await MerchLot.findByPk(dispenser.merchlot_id);

    const refill = async (weight) => {
        dispenser.current_weight = weight;
        await dispenser.save();
    };

    if (merchlot.quantity == 0) {
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
            include: [{
                model: [ Dispenser, Store ]
            }]
        });
        if (new_merchlot == null) 
            return [ false, "The selected merch lot is not suitable to be used" ];

        


    }     
    refill(added_weight);
}

module.exports = RefillDispenser;