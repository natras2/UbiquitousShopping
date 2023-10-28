const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('./model/customer');
require('dotenv').config();

var app = express();
const port = 8080;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

// Middleware to check if a request is authenticated
function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, out) => {
        if (err) {
            console.error(err);
            return res.sendStatus(403); // Forbidden
        } 
        req.uid = out.uid;
        next();
    });
}

// Register a new customer
app.post('/register', async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newCustomer = await Customer.create({
            name: req.body.name,
            surname: req.body.surname,
            sex: req.body.sex,
            address: req.body.address,
            id_type: req.body.id_type,
            id_number: req.body.id_number,
            email_address: req.body.email_address,
            hashed_password: hashedPassword
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'An error occurred while creating a customer.' });
    }
});

// Log in and generate a JWT
app.post('/login', async (req, res) => {
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
});

// Protected route - only accessible with a valid token
app.get('/protected', authenticateToken, async (req, res) => {
    const customer = await Customer.findOne({ where: { id: req.uid } });

    res.json(`Welcome, ${customer.name} ${customer.surname}!`);
});

// example: http://localhost:3000/
app.get('/', function (req, res) {
    let obj = { message: "Hello world!" };
    res.send(obj);
});

app.listen(port, () => {
    console.log('UbiShop API gateway listening on port', port);
});