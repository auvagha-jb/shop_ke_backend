const Table = require('./table')

class Users extends Table {

    constructor() {
        super('User');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS users (
            userId VARCHAR(128) PRIMARY KEY NOT NULL, 
            firebaseId VARCHAR(255) NOT NULL,
            firstName VARCHAR(255) NOT NULL, 
            lastName VARCHAR(255) NOT NULL, 
            email VARCHAR(255) NOT NULL, 
            countryCode VARCHAR(255) NOT NULL, 
            phoneNumber VARCHAR(255) NOT NULL,  
            isShopOwner INT(11) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        )`;

        super.createTable(sql);
    }


    insert(user) {
        let sql = 'INSERT INTO users SET ?';
        return super.insertWithUUID({ sql, object: user, idField: 'userId' })
    }

    update({ id, user }) {
        let sql = ` UPDATE users SET ? WHERE userId = ?`;
        console.log(sql);
        return super.query({ sql, args: [user, id] });
    }

    selectAll() {
        let sql = 'SELECT * FROM users';
        let response = super.query({ sql });
        return response;
    }

    selectById(id) {
        let sql = `SELECT * FROM users WHERE userId = ?`;
        return super.query({ sql, args: [id] });
    }

    selectByFirebaseId(id) {
        let sql = `SELECT * FROM users WHERE firebaseId = ? LIMIT 1`;
        return super.query({ sql, args: [id] });
    }

}

module.exports = Users;