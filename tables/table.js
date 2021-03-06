const connection = require('../db/connection.js');
const { v4: uuidv4 } = require('uuid');

class Table {

    constructor(objectName) {
        this.objectName = objectName == null ? objectName : '[NULL]';//Null Check
        this.defaultLog = `Performing action on database...`;
        this.errorMessage = "[Server error: 500] Something went wrong.";
    }


    /**
     * Gets specific properties from the request oject
     * @param {array} properties The properties you wish to extract
     * @param {object} requestBody The object send by client
     */
    getProperties(properties, requestBody) {
        let object = {};

        for (let prop of properties) {
            object[prop] = requestBody[prop];
        }
        console.log(object)
        return object;
    }

    createTable(sql) {
        let con = connection.dbConnection;
        con.query(sql, function (err, result) {
            try {
                if (err) throw err;
                console.log("Table created");

            } catch (error) {
                console.log(error);
            }
        });
    }

    async getUUID({ table, idField }) {
        const db = connection.makeDb();
        let idExists = true;
        let uuid;

        try {
            do {
                uuid = uuidv4();
                const sql = `SELECT COUNT(*) AS count FROM ${table} WHERE ${idField} = ?`;
                const query = await db.query(sql, [uuid]);

                if (query[0].count == 0) {
                    idExists = false;
                }

            } while (idExists);

        } catch (error) {
            console.log(`[getUUID]: ${error}`);
        } finally {
            await db.close();
        }

        return uuid;
    }

    /**
     * Inserts new row with unique uuid
     * For transactions, pass the db argument to avoid opening a new connection   
     */
    async insertWithUUID({ sql, object, idField }) {
        let code;
        let response;
        let uuid;

        do {
            uuid = uuidv4();
            object[idField] = uuid;
            response = await this.query({ sql, args: object });
            code = response['log']['code'];
        } while (code == 'ER_DUP_ENTRY');

        response['insertId'] = uuid;
        return response;
    }

    /**
     * For general queries 
     */
    async query({ sql, args = null }) {
        const db = connection.makeDb();
        let response;
        let status = false;
        let log = this.defaultLog;

        try {
            response = args != null ? await db.query(sql, args) : await db.query(sql);
            status = true;
            console.log(response);

        } catch (error) {
            // handle the error
            console.error(error);
            log = error;
            response = this.getErrorMessage(error);

        } finally {
            await db.close();
        }

        return { response, status, log }
    }


    getErrorMessage(error) {
        let errorMessage;

        switch (error.code) {
            case 'ER_PARSE_ERROR':
                errorMessage = "Nothing was passed in the request body";
                break;

            default:
                errorMessage = this.errorMessage;
                break;
        }

        return errorMessage;
    }

    async withTransaction(db, callback) {
        let status = false;
        let log = "Performing transaction...";

        try {
            await db.beginTransaction();
            await callback();
            await db.commit();
            status = true;

        } catch (error) {
            await db.rollback();
            log = error;
            console.log(error);

        } finally {
            await db.close();
        }

        return { log, status };
    }

}

module.exports = Table;