const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

var app = express();
const port = 8080;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

const clients = [];

// Middleware to check if a request is authenticated
function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error(err);
            return res.sendStatus(403); // Forbidden
        } 
        req.user = user;
        next();
    });
}

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        clients.push(user);
        res.status(201).send('User registered successfully');
    } catch(error) {
        console.error(error)
        res.status(500).send('Error registering user');
    }
});

// Log in and generate a JWT
app.post('/login', async (req, res) => {
    const user = clients.find(u => u.username === req.body.username);
    if (user == null) return res.status(400).send('User not found');

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch {
        res.status(500).send('Error authenticating user');
    }
});

// Protected route - only accessible with a valid token
app.get('/protected', authenticateToken, (req, res) => {
    res.json(`Welcome, ${req.user.username}!`);
});

// example: http://localhost:3000/
app.get('/', function (req, res) {
    let obj = { message: "Hello world!" };
    res.send(obj);
});

app.listen(port, () => {
    console.log('Hello world listening on port', port);
});