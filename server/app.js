const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


const ValidateToken = require('./auth/controller/validate');

/*
//update DB
const Cart = require('./model/cart');
const CartOffer = require('./model/cartoffer');
const Customer = require('./model/customer');
const Dispenser = require('./model/dispenser');
const Merch = require('./model/merch');
const MerchLot = require('./model/merchlot');
const Offer = require('./model/offer');
const Product = require('./model/product');
const SalesAssistant = require('./model/salesassistant');
const Store = require('./model/store');
const WeightSensor = require('./model/weightsensor'); 
*/

// Define different routers for the microserivices
const authRouter = require('./auth/endpoint');
app.use('/auth', authRouter);

const shoppingRouter = require('./shopping/endpoint');
app.use('/shopping', ValidateToken, shoppingRouter);

const accountRouter = require('./account/endpoint');
app.use('/account', ValidateToken, accountRouter);

const storeRouter = require('./store/endpoint');
app.use('/store', ValidateToken, storeRouter);

const historyRouter = require('./history/endpoint');
app.use('/history', ValidateToken, historyRouter);

const checkoutRouter = require('./checkout/endpoint');
app.use('/checkout', ValidateToken, checkoutRouter);

app.get('/', function (req, res) {
    const html = `
        <!DOCTYPE html>
        <html style="height: 100%;">
            <head>
                <title>UbiShop API</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="height: 100%;position: relative;margin: 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;display: flex;flex-direction: column;justify-content: center;align-items: center;font-size: 19px;padding: 0 15px;">
                <div style="width: 100%;margin: 2rem 1rem;max-width: 700px;border-radius:15px;padding: 3.5rem 2rem;border: 1px solid #f1f1f1;box-shadow: 5px 5px 15px #e1e1e1;">
                    <h1 style="height: 2.4em;font-weight: 200;border-bottom: 1px solid #bcbcbc;text-align: center;max-width: 544px;padding-bottom: 15px;margin: 15px auto 40px;">
                        <img src="https://raw.githubusercontent.com/natras2/UbiquitousShopping/a7cc9aa123d8483b359df520c0493ca52ca8ee73/client-apps/src/assets/images/logo/png/full.png" style="height: 5.5rem;margin-right: -7px;position: relative;top: -8px;" alt="UbiShop"> API
                    </h1>
                    <h3 style="color: #7C9805;font-weight: 400;">Welcome to UbiShop API</h3>
                    <p style="font-weight: 300;">Unlock a new ubiquitous shopping experience: UbiShop has been created to help retail customers to be more independent and autonomous in their purchase experiences, by tracking all the relevant information about products, supporting the local shops with the goods provision and the customization of service.</p>                    
                    <h3 style="color: #7C9805;font-weight: 400;">Discover what you can do</h3>
                    <p style="font-weight: 300;">Download the OpenAPI Specification file or <a href="https://github.com/natras2/UbiquitousShopping/wiki" >check the documentation</a>.</p>
                    <a href="/openapi" style="display: block;color: #efefef;background-color: #123b14;text-decoration: none;font-weight: 600;width: 254px;text-align: center;padding: .8rem;border: 1px solid #bcbcbc;border-radius: 41px;font-size: 14px;">DOWNLOAD THE SPECIFICATION</a>
                </div>
            </body>
        </html>
    `;
    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.send(html);

});

app.listen(8080, () => {
    console.log('UbiShop API gateway listening on port 8080');
});