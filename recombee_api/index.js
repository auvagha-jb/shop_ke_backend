var env = require('../env.js');
var recombee = require('recombee-api-client');
var rqs = recombee.requests;

var client = new recombee.ApiClient(env.RECOMBEE_DB_ID, env.RECOMBEE_PRIVATE_KEY);

// Prepare some userIDs and itemIDs
const NUM = 100;
var userIds = Array.apply(0, Array(NUM)).map((_, i) => {
  return `user-${i}`;
});

var itemIds = Array.apply(0, Array(NUM)).map((_, i) => {
  return `item-${i}`;
});


// Generate some random purchases of items by users
const PROBABILITY_PURCHASED = 0.1;
var purchases = [];
userIds.forEach((userId) => {
  var purchased = itemIds.filter(() => Math.random() < PROBABILITY_PURCHASED);
  purchased.forEach((itemId) => {
    purchases.push(new rqs.AddPurchase(userId, itemId, { 'cascadeCreate': true }))
  });
});

// Send the data to Recombee, use Batch for faster processing of larger data
client.send(new rqs.Batch(purchases))
  .then(() => {
    //Get 5 recommended items for user 'user-25'
    return client.send(new rqs.RecommendItemsToUser('user-25', 5));
  })
  .then((response) => {
    console.log("Recommended items for user-25: %j", response.recomms);

    // User scrolled down - get next 3 recommended items
    return client.send(new rqs.RecommendNextItems(response.recommId, 3));
  })
  .then((response) => {
    console.log("Next recommended items for user-25: %j", response.recomms);
  })
  .catch((error) => {
    console.error(error);
    // Use fallback
  });