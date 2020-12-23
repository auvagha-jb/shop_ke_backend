const Table = require('./table')
const connection = require('../db/connection.js');

class Orders extends Table {

    constructor() {
        super('Order');
        this.tableName = 'orders';
        this.idField = 'orderId';
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS orders (
            orderId VARCHAR(128) PRIMARY KEY NOT NULL, 
            userId VARCHAR(128) NOT NULL,
            storeId VARCHAR(128) NOT NULL,
            orderTotal FLOAT(11) NOT NULL,
            orderStatus ENUM('Pending','Cancelled', 'Complete'),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        super.createTable(sql);
    }


    async insert(requestBody) {
        const db = connection.makeDb();
        const order = requestBody.order;
        const orderItems = requestBody.orderItems;
        const orderId = await super.getUUID({ table: this.tableName, idField: this.idField });
        let response = {};

        if (!order || !orderItems) {
            return { 'status': false };
        }

        response = await super.withTransaction(db, async () => {
            const orderSql = `INSERT INTO orders SET ?`;
            order[this.idField] = orderId;
            await db.query(orderSql, order);

            for (let orderItem of orderItems) {
                const orderItemsSql = 'INSERT INTO order_items SET ?';
                orderItem['orderId'] = orderId;
                await db.query(orderItemsSql, orderItem);
            }
        });

        response['insertId'] = response.status ? orderId : null;

        return response;
    }

    update({ id, order }) {
        let sql = `UPDATE orders SET ? WHERE ${this.idField} = ?`;
        return super.query({ sql, args: [order, id] });
    }

    selectAllOrdersToStore(storeId) {
        let sql = ` SELECT * FROM orders  
                    JOIN users
                    ON orders.userId = users.userId 
                    WHERE orders.storeId = ?
                    ORDER BY orders.createdAt`;
        return super.query({ sql, args: [storeId] });
    }

    selectAllOrdersByUser(userId) {
        let sql = ` SELECT * FROM orders
                    WHERE orders.userId = ?`;
        return super.query({ sql, args: [userId] });
    }

    selectByOrderId(orderId) {
        let sql = ` SELECT * FROM orders
                    JOIN order_items 
                    ON orders.orderId = order_items.orderId
                    JOIN products
                    ON order_items.productId = products.productId
                    WHERE orders.orderId`;
        return super.query({ sql, args: [orderId] });
    }

}

module.exports = Orders;