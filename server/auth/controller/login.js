const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../../model/customer');
const SalesAssistant = require('../../model/salesassistant');

const secretKey = process.env.SECRET_KEY;

async function CustomerLogin(email, password) {
    const customer = await Customer.findOne({ 
        where: { 
            email_address: email 
        } 
    });
    if (customer == null) return;
    
    if (await bcrypt.compare(password, customer.hashed_password)) {
        let token_data = {
            id: customer.id,
            type: "Customer"
        }
        return jwt.sign(token_data, secretKey, { expiresIn: '1h' });
    }
    return;
}

async function SalesAssistantLogin(email, password) {
    const salesassistant = await SalesAssistant.findOne({ 
        where: { 
            email_address: email 
        } 
    });    
    if (salesassistant == null) return;
    
    if (await bcrypt.compare(password, salesassistant.hashed_password)) {
        let token_data = {
            id: salesassistant.id,
            type: "SalesAssistant"
        }
        return jwt.sign(token_data, secretKey, { expiresIn: '1h' });
    }
    return;
}

module.exports = {
    CustomerLogin,
    SalesAssistantLogin
};