//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Dispenser = require('../../model/dispenser');
const MerchLot = require('../../model/merchlot');

async function MerchAccess(iddispenser, store_id) {
    
    const dispenser = await Dispenser.findOne({ 
        where: { 
            id: iddispenser,
            store_id: store_id
        }, 
        include: [{ 
            model: MerchLot,
            include: { 
                model: Merch 
            }
        }]
    });

    if(dispenser == null){
        return null;
    }
    
    const result = {
        name: dispenser.MerchLot.Merch.name,
        category: dispenser.MerchLot.Merch.category,
        description: dispenser.MerchLot.Merch.description,
        price_per_milligram: dispenser.MerchLot.Merch.price_per_milligram,
        vendor: dispenser.MerchLot.vendor,
        expiration_date: dispenser.MerchLot.expiration_date,
        traceability_info: JSON.stringify(dispenser.MerchLot.traceability_info),
        nutritional_info: JSON.stringify(dispenser.MerchLot.nutritional_info)
    }
   
    return result;
}

module.exports = MerchAccess;