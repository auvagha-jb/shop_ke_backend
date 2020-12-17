const connection = require('../db/connection.js');
const Table = require('./table');
const StoreOwners = require('./store_owners.js');
const { reset } = require('nodemon');
const { response } = require('express');

class Stores extends Table {

    constructor() {
        super('Store');
        this.createTable();
        this.properties = [
            'county',
            'industryId',
            'logo',
            'physicalAddress',
            'storeName'
        ];
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS stores (
            storeId VARCHAR(128) PRIMARY KEY NOT NULL, 
            county VARCHAR(255) NOT NULL,
            industryId VARCHAR(128) NOT NULL,
            logo VARCHAR(255) NOT NULL,
            physicalAddress VARCHAR(255) NOT NULL,
            storeName VARCHAR(255) NOT NULL,
            visitCount INT(11) DEFAULT 0,
            isActive TINYINT(1) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        super.createTable(sql);
    }


    async insert(requestBody) {
        const db = connection.makeDb();
        const store = requestBody.store;
        const user = requestBody.user;
        const storeId = await super.getUUID({ table: 'stores', idField: 'storeId' });
        let response = {};

        response = await super.withTransaction(db, async () => {
            const storeSql = 'INSERT INTO stores SET ?';
            store.storeId = storeId;
            await db.query(storeSql, store);

            const storeOwnerSql = 'INSERT INTO store_owners SET ?';
            await db.query(storeOwnerSql, { storeId: storeId, userId: user.userId });
        });

        response['insertId'] = response.status ? storeId : null;

        return response;
    }

    update({ store, id }) {
        let sql = `UPDATE users SET ? WHERE storeId = ?`;
        return super.query({ sql, args: [store, id] });
    }

    selectById(id) {
        let sql = `SELECT * FROM stores WHERE storeId = ?`;
        return super.query({ sql, args: [id] });
    }

}


module.exports = Stores;