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
      items = this.getItemsFromRecommedation(response);
    } catch (error) {
      console.error(`recommendation error: ${error}`);
    }

    return items;
  }

  async getInteractions(userId) {
    let items = [];

    try {
      let response = await client.send(new rqs.ListUserDetailViews(userId));
      items = this.getItemsFromInteractions(response);
      console.log(items);
    } catch (error) {
      console.error(`recommendation error: ${error}`);
    }

    return items;
  }

  async getItemsFromRecommedation(response) {
    const ids = [];
    for (var object of response.recomms) {
      ids.push(object['id']);
    }

    const items = new ProductInteractions().selectProductsById(ids);
    return items;
  }

  getItemsFromRecommedation(response) {
    let ids = [];
    for (var object of response.recomms) {
      ids.push(object['id']);
    }

    const items = new ProductInteractions().selectProductsById(ids);
    return items;
  }

  getItemsFromInteractions(response) {
    let ids = [];
    for (let map of response) {
      ids.push(map['itemId']);
    }

    ids = ids.filter((v, i, a) => a.indexOf(v) === i);

    const items = new ProductInteractions().selectProductsById(ids);
    return items;
  }
}

module.exports = RecombeeApi;