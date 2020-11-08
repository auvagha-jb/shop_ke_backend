const db = require('./db');

const express = require('express');

class Table {

    constructor(objectName) {
        this.objectName = objectName;
    }

    createTable(sql) {
        let status = false;

        try {

            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
            });

            status = true;

        } catch (error) {
            console.error(error);
        }

        return status;
    }


    insert({ object, sql }) {
        let status = false;
        let message;

        try {
            db.query(sql, object, (err, result) => {
                if (err) throw err;
                console.log(result);
            });

            message = `${this.objectName} added successfully`;
            status = true;

        } catch (error) {
            message = "Something went wrong. Please try again";
        }

        return {
            message: message,
            status: status
        }
    }
    
    update(sql) {
        let status = false;
        let message;

        try {
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
            });

            message = `Updated ${this.objectName} successfully`;
            status = true;

        } catch (error) {
            message = "Something went wrong. Please try again";
        }

        return {
            message: message,
            status: status
        }
    }



}


module.exports = Table;