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
    },
    discount_rate: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
    },
});

Offer.belongsToMany(Cart, { through: 'CartOffer' });
Cart.belongsToMany(Offer, { through: 'CartOffer' });

module.exports = Offer;