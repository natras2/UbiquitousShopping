const Sequelize = require('sequelize');
const db = require('../config/database');
const Offer = require('./offer');
const Cart = require('./cart');

const CartOffer = db.define('CartOffer', {
    offer_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Offer,
            key: 'id'
        }
    },
    cart_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Cart,
            key: 'id'
        }
    }
});

Offer.belongsToMany(Cart, {
    through: CartOffer,
    foreignKey: {
        name: 'offer_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    otherKey: 'cart_id'
});

Cart.belongsToMany(Offer, {
    through: CartOffer,
    foreignKey: {
        name: 'cart_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    otherKey: 'offer_id'
});

module.exports = CartOffer;