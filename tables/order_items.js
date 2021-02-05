const Table = require('./table')

class OrderItems extends Table {

    constructor() {
        super('Order Items');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS order_items (
            orderId VARCHAR(128) NOT NULL, 
            storeId VARCHAR(128) NOT NULL, 
            productId VARCHAR(128) NOT NULL,
            price DECIMAL(11,2) NOT NULL,
            quantity VARCHAR(255) NOT NULL,
            subtotal FLOAT(11) NOT NULL,
            PRIMARY KEY (orderId, productId)
        );
        `;

        super.createTable(sql);
    }

}

module.exports = OrderItems;