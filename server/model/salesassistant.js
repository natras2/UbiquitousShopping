const Sequelize = require('sequelize');
const db = require('../config/database');

const SalesAssistant = db.define('SalesAssistant', {
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
});

module.exports = SalesAssistant;