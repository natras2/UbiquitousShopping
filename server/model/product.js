const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    weight: {
        type: Sequelize.DECIMAL(8,3), // 99999,999 g
        allowNull: false, 
        comment: 'in grams, max 99999.999',
    },
    price: {
        type: Sequelize.DECIMAL(6,2), // 9999,99 €
        allowNull: false, 
        comment: 'in euro, max 9999.99',
    },
});

module.exports = Product;