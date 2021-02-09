const Table = require('./table')

class ProductInteractions extends Table {

    constructor() {
        super('Product Interactions');
        this.tableName = 'product_interactions';
    }

    async selectProductsById(ids) {
        const where = this.getWhere(ids);
        let sql = `SELECT * FROM ${this.tableName} ${where}`;
        console.log(sql);
        let response = super.query({ sql, args: [ids] });
        console.log(response);
        return response;
    }

    getWhere(ids) {
        let string = "WHERE ";

        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            if (i === ids.length - 1) {
                string += `product_id = ${id} GROUP BY product_id`;
            } else {
                string += `product_id = ${id} OR `;
            }
        }
        console.log(string);
        return string;
    }

}

module.exports = ProductInteractions;