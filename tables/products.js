const Table = require('./table')

class Products extends Table {

    constructor() {
        super('Product');
        this.tableName = 'products';
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS ${this.tableName} (
            productId VARCHAR(128) PRIMARY KEY NOT NULL, 
            storeId VARCHAR(128) NOT NULL,
            productName VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            imageUrl VARCHAR(255) DEFAULT NULL,
            price FLOAT(11) NOT NULL,
            numInStock INT(11) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL DEFAULT NULL
        )`;

        super.createTable(sql);
    }


    insert(product) {
        let sql = `INSERT INTO ${this.tableName} SET ?`;
        return super.insertWithUUID({ sql, object: product, idField: 'productId' });
    }

    update({ id, product }) {
        let sql = `UPDATE ${this.tableName} SET ? WHERE productId = ?`;
        return super.query({ sql, args: [product, id] });
    }

    selectAll() {
        let sql = `SELECT * FROM ${this.tableName}`;
        return super.query({ sql });
    }

    selectBy(args) {
        let sql = `SELECT * FROM ${this.tableName} WHERE ?`;
        return super.query({ sql, args });
    }

    archive(id) {
        let sql = `UPDATE ${this.tableName} SET deletedAT = NOW() WHERE productId = ?`;
        return super.query({ sql, args: [id]});
    }

    restore(id) {
        let sql = `UPDATE ${this.tableName} SET deletedAT = NULL WHERE productId = ?`;
        return super.query({ sql, args: [id]});
    }

}

module.exports = Products;