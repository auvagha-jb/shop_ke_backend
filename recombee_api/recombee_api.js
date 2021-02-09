var env = require('../env.js');
var recombee = require('recombee-api-client');
var client = new recombee.ApiClient(env.RECOMBEE_DB_ID, env.RECOMBEE_PRIVATE_KEY);
var rqs = recombee.requests;
const ProductInteractions = require('../tables/product_interactions.js');

class RecombeeApi {
  
  constructor() {
    console.log('Recombee Api');
  }

  async getRecommendations(userId) {
    let items = [];

    try {
      let response = await client.send(new rqs.RecommendItemsToUser(userId, 5));

      let ids = [];
      for (var object of response.recomms) {
        ids.push(object['id']);
      }
      items = ids;

      items = new ProductInteractions().selectProductsById(ids);

    } catch (error) {
      console.error(`recommendation error: ${error}`);
    }

    return items;
  }

  getNext(res) {
    return client.send(new rqs.RecommendNextItems(response.recommId, 3))
  }

  async get(userId) {
    return userId;
  }
}

new RecombeeApi().getRecommendations('422073359');

module.exports = RecombeeApi;