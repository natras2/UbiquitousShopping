const Sequelize = require('sequelize');
const db = require('../config/database');
const SalesAssistant = require('./salesassistant');

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

Store.hasMany(SalesAssistant, {
    foreignKey: {
        name: 'store_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
SalesAssistant.belongsTo(Store);

module.exports = Store;