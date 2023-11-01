//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Dispenser = require('../../model/dispenser');
const MerchLot = require('../../model/merchlot');

async function MerchAccess(iddispenser) {
    
    const dispenser = await Dispenser.findOne({ 
        where: { 
            id: iddispenser 
        }, 
        include: [{
            model: MerchLot
        }]  
    });
    
    const merchlot = dispenser.MerchLot
   
    return merchlot;
}

module.exports = MerchAccess;