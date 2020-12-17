const Table = require('./table')

class Subscriptions extends Table {

    constructor() {
        super('Subscription');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS subscriptions (
            storeId VARCHAR(128) NOT NULL, 
            userId VARCHAR(128) NOT NULL,
            getNotifications TINYINT(1) NOT NULL DEFAULT 1,
            PRIMARY KEY (storeId, userId)
        );
        `;

        super.createTable(sql);
    }

    /**
     * 
     * @param {object} subscription {storeId, userId}
     */
    subscribe(subscription) {
        let sql = 'INSERT INTO subscriptions SET ?';
        return super.query({ sql, args: subscription });
    }

    unsubscribe({ storeId, userId }) {
        let sql = `DELETE FROM subscriptions WHERE storeId = ? AND userId = ?`;
        return super.query({ sql, args: [storeId, userId] });
    }

}

module.exports = Subscriptions;