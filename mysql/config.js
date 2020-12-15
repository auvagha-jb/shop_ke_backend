const env = require('../env');

// Create connection
const config = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
};


module.exports = config;