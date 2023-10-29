const Sequelize = require('sequelize');
const db = require('../config/database');
const Product = require('./product');

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

Cart.hasMany(Product, {
    foreignKey: {
        name: 'cart_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Product.belongsTo(Cart, {
    foreignKey: {
        name: 'cart_id',
        allowNull: false
    }
});

module.exports = Cart;