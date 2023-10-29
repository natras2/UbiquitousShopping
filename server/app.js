const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Store = require('./model/store');

// Define different routers for the microserivices
const authRouter = require('./auth/endpoint');
app.use('/auth', authRouter);

const shoppingRouter = require('./shopping/endpoint');
app.use('/shopping', shoppingRouter);

const accountRouter = require('./account/endpoint');
app.use('/account', accountRouter);

const storeRouter = require('./store/endpoint');
app.use('/store', storeRouter);

const historyRouter = require('./history/endpoint');
app.use('/history', historyRouter);

const checkoutRouter = require('./checkout/endpoint');
app.use('/checkout', checkoutRouter);

app.get('/', function (req, res) {
    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Welcome to the App API</title>
            </head>
            <body>
                <h1>Welcome to the App API Page</h1>
                <p>Click the link below to download the OpenAPI file:</p>
                <a href="/openapi">Download OpenAPI File</a>
            </body>
        </html>
    `;
    res.send(html);

});

app.listen(8080, () => {
    console.log('UbiShop API gateway listening on port 8080');
});