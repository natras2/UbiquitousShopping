const express = require('express');
const CustomerLogin = require('./controller/login');
const authRouter = express.Router();

// Log in and generate a JWT
authRouter.post('/login', CustomerLogin);

module.exports = authRouter;