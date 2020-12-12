const mysql = require('mysql');
const env = require('../env');
const util = require('util');

// Create connection
const config = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
});


// function promisify() {
//     const connection = mysql.createConnection(config);
//     return {
//         query(sql, args) {
//             return util.promisify(connection.query)
//                 .call(connection, sql, args);
//         },
//         close() {
//             return util.promisify(connection.end).call(connection);
//         }
//     };
// }

// const transaction = promisify();


const pool = mysql.createPool(config);

const connection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            console.log("MySQL pool connected: threadId " + connection.threadId);
            const query = (sql, binding) => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, binding, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });
            };
            const release = () => {
                return new Promise((resolve, reject) => {
                    if (err) reject(err);
                    console.log("MySQL pool released: threadId " + connection.threadId);
                    resolve(connection.release());
                });
            };
            resolve({ query, release });
        });
    });
};

const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, binding, (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = { pool, connection, query };
