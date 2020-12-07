const db = require('./db');

const express = require('express');

class Table {

    constructor(objectName) {
        this.objectName = objectName;
    }

    createTable(sql) {
        let status = false;

        db.query(sql, (err, result) => {
            try {
                if (err) throw err;
                // console.log(result);
                status = true;

            } catch (error) {
                console.error(error);
            }
        });

        return status;
    }

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
                    status: false,
                });
            }
        });
    }

    query({ sql, response }) {
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
                    response: 'Something went wrong. Please try again later'
                });
            }
        });
    }


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
            }
        });
    }



}


module.exports = Table;