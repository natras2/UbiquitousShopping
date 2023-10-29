const Sequelize = require('sequelize');
const db = require('../config/database');
const WeightSensor = require('./weightsensor');

const Dispenser = db.define('Dispenser', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    store_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    width: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    depth: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
});

Dispenser.hasOne(WeightSensor, {
    foreignKey: {
        name: 'dispenser_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
WeightSensor.belongsTo(Dispenser, {
    foreignKey: {
        name: 'dispenser_id',
        allowNull: false
    }
});

module.exports = Dispenser;