const Sequelize = require('sequelize');
const db = require('../config/database');
const Product = require('./product');
const Dispenser = require('./dispenser');

const MerchLot = db.define('MerchLot', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vendor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    expiration_date: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'YYYY-MM-DD',
    },
    traceability_info: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'JSON format',
    },
    nutritional_info: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'JSON format',
    },
});

MerchLot.hasMany(Product, {
    foreignKey: {
        name: 'merchlot_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
Product.belongsTo(MerchLot, {
    foreignKey: {
        name: 'merchlot_id',
        allowNull: false
    }
});

MerchLot.hasOne(Dispenser, {
    foreignKey: {
        name: 'merchlot_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
Dispenser.belongsTo(MerchLot, {
    foreignKey: {
        name: 'merchlot_id',
        allowNull: false
    }
});

module.exports = MerchLot;