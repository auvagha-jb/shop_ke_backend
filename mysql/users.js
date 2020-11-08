const Table = require('./table')

class Users extends Table {

    constructor() {
        super('User');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS users (
            id INT(255) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            firstName VARCHAR(255), 
            lastName VARCHAR(255), 
            email VARCHAR(255), 
            countryCode VARCHAR(255), 
            phoneNumber VARCHAR(255), 
            fullPhoneNumber VARCHAR(255), 
            isShopOwner INT(1)
        )`;

        return super.createTable(sql);
    }


    insert(user) {
        let sql = 'INSERT INTO users SET ?';
        return super.insert({ object: user, sql: sql })
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

        return super.update({object: user, sql: sql});
    }

    selectById(id) {
        let sql = `SELECT * FROM users WHERE id = ${id}`;
        return sql;
    }

}


module.exports = Users;