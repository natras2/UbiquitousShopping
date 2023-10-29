const Sequelize = require('sequelize');
require('dotenv').config();

// Connection
const db = new Sequelize({
    dialect: 'mysql',
    host: (process.env.IS_LOCAL) ? 'localhost' : undefined,
    dialectOptions: (process.env.IS_LOCAL) ? undefined: {
        socketPath: process.env.DB_CLOUDSQL_INSTANCE
    },
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connection test
db
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');

        db.sync({force: true})
        .then(() => {
            console.log('Database and tables schemas are synched');
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })

module.exports = db;