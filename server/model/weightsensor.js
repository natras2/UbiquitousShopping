const Sequelize = require('sequelize');
const db = require('../config/database');

const WeightSensor = db.define('WeightSensor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vendor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    specifics: {
        type: Sequelize.STRING(1024),
        allowNull: false, 
    },
});

module.exports = WeightSensor;