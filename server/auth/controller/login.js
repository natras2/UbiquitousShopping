const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../../model/customer');

const secretKey = process.env.SECRET_KEY;

async function CustomerLogin(req, res) {
    const customer = await Customer.findOne({ where: { email_address: req.body.email_address } });

    try {
        if (await bcrypt.compare(req.body.password, customer.hashed_password)) {
            const token = jwt.sign({ uid: customer.id }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token });
        } 
        else {
            res.status(401).send('Authentication failed');
        }
    } 
    catch(err) {
        res.status(500).send('Error authenticating customer. '+ err);
    }
}

module.exports = CustomerLogin;