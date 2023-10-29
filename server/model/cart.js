const Sequelize = require('sequelize');
const db = require('../config/database');

const Cart = db.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    generation_date: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    is_closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: 1,
    }
});

module.exports = Cart;