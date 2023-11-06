const Sequelize = require('sequelize');
const db = require('../config/database');
const Cart = require('./cart');

const Offer = db.define('Offer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    expiration_date: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'YYYY-MM-DD',
    },
    discount_rate: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
        comment: 'percentage',
    },
});

module.exports = Offer;