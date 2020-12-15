const connection = require('./connection.js');
const { v4: uuidv4 } = require('uuid');

class Table {

    constructor(objectName) {
        this.objectName = objectName;
    }

    errorMessage = "[Server error: 500] Something went wrong.";

    createTable(sql) {
        let con = connection.dbConnection;
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
        });
    }

    generateUniqueId() {
        let length = 28;
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result =  this.objectName.concat(`-${result}`)
        return result;
    }



    /**
     * Inserts new row with unique uuid 
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
        let log = "Querying the database...";

        try {
            response = args != null ? await db.query(sql, args) : await db.query(sql);
            status = true;
            console.log(response);

        } catch (e) {
            // handle the error
            console.error(e);
            log = e;
            response = this.errorMessage;

        } finally {
            await db.close();
        }

        return { response, status, log }
    }

}


module.exports = Table;