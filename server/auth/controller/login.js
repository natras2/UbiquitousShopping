const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../../model/customer');

const secretKey = process.env.SECRET_KEY;

async function CustomerLogin(email, password) {
    const customer = await Customer.findOne({ where: { email_address: email } });
    
    // check if the customer exists
    if (customer == null) return;
    
    if (await bcrypt.compare(password, customer.hashed_password)) {
        return jwt.sign({ uid: customer.id }, secretKey, { expiresIn: '1h' });
    }
    return;
}

module.exports = CustomerLogin;