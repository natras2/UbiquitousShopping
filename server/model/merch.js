const Sequelize = require('sequelize');
const db = require('../config/database');
const MerchLot = require('./merchlot');

const Merch = db.define('Merch', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(1024),
        allowNull: false,
    },
    weight_threshold: {
        type: Sequelize.DECIMAL(8,3), // 99999,999 g
        allowNull: false, 
    },
    price_per_milligram: {
        type: Sequelize.DECIMAL(6,4), // 99,9999 €
        allowNull: false, 
    },
    discriminant: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'SOLID',
    },
    milliliters_to_milligrams: {
        type: Sequelize.DECIMAL(6,4),
    }
});

Merch.hasMany(MerchLot, {
    foreignKey: {
        name: 'merch_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
MerchLot.belongsTo(Merch, {
    foreignKey: {
        name: 'merch_id',
        allowNull: false
    }
});

module.exports = Merch;