const Sequelize = require('sequelize');
const db = require('../config/database');
const Cart = require('./cart');

const Customer = db.define('Customer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    hashed_password: {
        type: Sequelize.STRING(256),
        allowNull: false, 
    },
    sex: {
        type: Sequelize.STRING(1),
        allowNull: false, 
    },
    address: {
        type: Sequelize.STRING(1024),
        allowNull: false, 
    },
    id_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    registration_date: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'YYYY-MM-DD',
    },
    email_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: 0,
    },
    is_validated: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: 0,
    },
});

Customer.hasMany(Cart, {
    foreignKey: {
        name: 'customer_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Cart.belongsTo(Customer, {
    foreignKey: {
        name: 'customer_id',
        allowNull: false
    }
});

module.exports = Customer;