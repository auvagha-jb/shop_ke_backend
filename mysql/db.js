/**
 * Database Connection
 */
const mysql = require('mysql');
const env = require('../env');


// Create connection
const db = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
});


// Connect
db.connect((err) => {
    try {
        if (err) {
            throw err;
        }
        console.log('MySql Connected...');
    } catch (error) {
        console.error(error);
    }
});

module.exports = db;