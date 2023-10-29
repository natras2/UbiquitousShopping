const Sequelize = require('sequelize');
const db = require('../config/database');
const Cart = require('./cart');
const SalesAssistant = require('./salesassistant');
const Dispenser = require('./dispenser');
const MerchLot = require('./merchlot');

const Store = db.define('Store', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(1024),
        allowNull: false, 
    },
});

Store.hasMany(Cart, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
Cart.belongsTo(Store, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    }
});

Store.hasMany(SalesAssistant, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
SalesAssistant.belongsTo(Store, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    }
});

Store.hasMany(Dispenser, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
Dispenser.belongsTo(Store, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    }
});

Store.hasMany(MerchLot, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
MerchLot.belongsTo(Store, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    }
});

module.exports = Store;