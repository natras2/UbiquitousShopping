const Dispenser = require("../../model/dispenser");
const SalesAssistant = require("../../model/salesassistant");
const MerchLot = require("../../model/merchlot");
const Merch = require("../../model/merch");

async function GetDispensers(sa_id, store_id, dispenser_id) {
    const sa = await SalesAssistant.findByPk(sa_id);

    if (!sa || sa == null) 
        return [ null, "The sales assistant do not exist" ];

    if (sa.store_id != store_id) 
    return [ null, "The sales assistant is not authorized to perform this operation" ];

    let whereStatement = { store_id: sa.store_id };
    if (!!dispenser_id) 
        whereStatement.id = dispenser_id;

    const dispensers = await Dispenser.findAll({ 
        where: whereStatement,
        attributes:['id','current_weight','is_locked'],
        include: [{ 
            model: MerchLot,
            attributes:['id','expiration_date','quantity', 'traceability_info'],
            include: [{
                model: Merch,
                attributes:['id','name','weight_threshold'],
            }]
        }]
    });
 
    if (!dispensers || dispensers == null) 
        return [ null, "There aren't dispensers in the specified store" ];

    dispensers.forEach(item => {
        item.MerchLot.traceability_info = JSON.parse(item.MerchLot.traceability_info);
    });

    if (!!dispenser_id)
        return [dispensers[0]];
    
    return [ dispensers ];
}

module.exports = GetDispensers;