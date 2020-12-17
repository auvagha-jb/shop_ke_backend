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

    insert(storeOwner) {
        let sql = 'INSERT INTO store_owners SET ?';
        return super.query({ sql, args: storeOwner });
    }

    delete({ storeId, userId }) {
        let sql = `DELETE FROM store_owners WHERE storeId = ? AND userId = ?`;
        return super.query({ sql, args: [storeId, userId] });
    }

}

module.exports = StoreOwners;