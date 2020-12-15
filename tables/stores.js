const Table = require('./table')

class Stores extends Table {

    constructor() {
        super('User');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS stores (
            storeId INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            userId INT(11) NOT NULL,
            storeName VARCHAR(255) NOT NULL,
            logo VARCHAR(255) NOT NULL,
        )`;

        return super.createTable(sql);
    }


    insert(user) {
        let sql = 'INSERT INTO users SET ?';
        return super.insert({ object: user, sql: sql })
    }

    query({ id, user }) {
        let sql = ` UPDATE users SET
                    firstName  = '${user.firstName}', 
                    lastName = '${user.lastName}', 
                    email = '${user.email}', 
                    countryCode = '${user.countryCode}', 
                    phoneNumber = '${user.phoneNumber}', 
                    fullPhoneNumber = '${user.fullPhoneNumber}', 
                    isShopOwner = '${user.isShopOwner}' WHERE id = ${id}
                    `;

        return super.query({object: user, sql: sql});
    }

    selectById(id) {
        let sql = `SELECT * FROM users WHERE id = ${id}`;
        return sql;
    }

}


module.exports = Stores;