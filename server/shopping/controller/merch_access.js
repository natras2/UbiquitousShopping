//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const MerchLot = require('../../model/merchlot');

async function MerchAccess(idmerchlot) {
    const merchlot = await MerchLot.findOne({ where: { id: idmerchlot } });
    
    // check if the merchlot exists
    //if (merchlot == null){
    //    return merchlot;}

    return merchlot;
}

module.exports = MerchAccess;