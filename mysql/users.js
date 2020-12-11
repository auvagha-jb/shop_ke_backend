const Table = require('./table')

class Users extends Table {

    constructor() {
        super('User');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS users (
            userId INT(255) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            firebaseId VARCHAR(255) NOT NULL,
            firstName VARCHAR(255) NOT NULL, 
            lastName VARCHAR(255) NOT NULL, 
            email VARCHAR(255) NOT NULL, 
            countryCode VARCHAR(255) NOT NULL, 
            phoneNumber VARCHAR(255) NOT NULL,  
            isShopOwner INT(1) NOT NULL
        )`;

        return super.createTable(sql);
    }


    insert(user, response) {
        let sql = 'INSERT INTO users SET ?';
        return super.write({ object: user, sql, response });
    }

    update({ id, user }) {
        let sql = ` UPDATE users SET
                    firstName  = '${user.firstName}', 
                    lastName = '${user.lastName}', 
                    email = '${user.email}', 
                    countryCode = '${user.countryCode}', 
                    phoneNumber = '${user.phoneNumber}', 
                    fullPhoneNumber = '${user.fullPhoneNumber}', 
                    isShopOwner = '${user.isShopOwner}' WHERE id = ${id}
                    `;

        console.log(sql);

        super.select({ object: user, sql: sql });
    }

    selectById(id, response) {
        let sql = `SELECT * FROM users WHERE userId = ${id}`;
        super.select({ sql, response });
    }

    selectByFirebaseId(id, response) {
        let sql = `SELECT * FROM users WHERE firebaseId = '${id}' LIMIT 1`;
        super.select({ sql, response });
    }

}


module.exports = Users;