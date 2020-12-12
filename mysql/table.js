const db = require('./db');
const transaction = require('./transaction');

class Table {

    constructor(objectName) {
        this.objectName = objectName;
    }

    createTable(sql) {
        let status = false;

        db.query(sql, (err, result) => {
            try {
                if (err) throw err;
                console.log(result);
                status = true;

            } catch (error) {
                console.error(error);
            }
        });

        return status;
    }

    generateUniqueId() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        // console.log(makeid(5));
        return result;
    }

    /**
     * For insert and update queries 
     */
    write({ object, sql, successMessage, response }) {
        db.query(sql, object, (err, result) => {

            try {
                if (err) throw err;
                console.log(result)

                response.send({
                    response: successMessage != null ? successMessage : `${this.objectName} added successfully`,
                    status: result.affectedRows > 0,
                    insertId: result.insertId
                });

            } catch (error) {
                response.send({
                    response: 'Something went wrong. Please try again later',
                    log: { error, object },
                    status: false,
                });
            } finally {
                db.close();
            }
        });
    }

    /**
     * For select queries
     */
    select({ sql, response }) {
        db.query(sql, (err, result) => {
            try {
                if (err) throw err;
                console.log(result);

                response.send({
                    status: true,
                    response: result
                });

            } catch (error) {
                response.send({
                    status: false,
                    response: 'Something went wrong. Please try again later',
                    log: { error, sql },
                });

            } finally {
                db.close();
            }
        });
    }

    /**
     * For delete queries
     */
    delete({ sql, response }) {
        db.query(sql, (err, result) => {
            try {
                if (err) throw err;
                console.log(result);

                response.send({
                    status: result.affectedRows > 0,
                    response: successMessage != null ? successMessage : `${this.objectName} deleted successfully`,
                });

            } catch (error) {
                response.send({
                    status: false,
                    response: 'Something went wrong. Please try again later'
                });

            } finally {
                db.close();
            }
        });
    }


}


module.exports = Table;