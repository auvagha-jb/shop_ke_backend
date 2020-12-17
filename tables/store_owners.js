const Table = require('./table')

class StoreOwners extends Table {

    constructor() {
        super('Store Owner');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS store_owners (
            storeId VARCHAR(128) NOT NULL, 
            userId VARCHAR(128) NOT NULL,
            PRIMARY KEY (storeId, userId)
        );
        `;

        super.createTable(sql);
    }

}

module.exports = StoreOwners;