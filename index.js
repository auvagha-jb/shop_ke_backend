const express = require('express');
const route = require('./utils/route.js');
const env = require('./env.js');

//Import table classes 
const Users = require('./tables/users.js')
const Stores = require('./tables/stores.js');
const StoreOwners = require('./tables/store_owners.js');
const Subscriptions = require('./tables/subscriptions.js');
const Products = require('./tables/products.js');
const Orders = require('./tables/orders.js');
const OrderItems = require('./tables/order_items.js');
//End: Import table classes 

//Init table classes
const users = new Users();
const stores = new Stores();
const storeOwners = new StoreOwners();
const subscriptions = new Subscriptions();
const products = new Products();
const orders = new Orders();
const orderItems = new OrderItems();
// End: Init Tables


const app = express();

//Middleware that assembles json sent in post request
const bodyParser = require('body-parser');

const PORT = env.PORT;

//Add Middleware

//Parse json responses to objects 
app.use(bodyParser.json());

// Custom middleware
app.use(async (req, res, next) => {
    console.log(`[${req.method}] ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//ROUTES

//User routes start
app.post(route('user/'), (req, res) => {
    console.log({user: req.body});
    users.insert(req.body).then((response) => {
        res.send(response);
    })
});

app.get(route('user/'), (req, res) => {
    users.selectAll().then((response) => {
        res.send(response);
    });
});

app.get(route('user/firebase/:id/'), (req, res) => {
    users.selectByFirebaseId(req.params.id).then((response) => {
        res.send(response);
    });
});

app.get(route('user/:id/'), (req, res) => {
    users.selectById(req.params.id).then((response) => {
        res.send(response);
    });
});

app.patch(route('user/:id'), (req, res) => {
    users.update({ id: req.params.id, user: req.body }).then((response) => {
        res.send(response);
    });
});
//User routes end


//Store routes start
app.post(route('store/'), (req, res) => {
    stores.insert(req.body).then((response) => {
        res.send(response);
    });
});
//Store routes end


//Subscription routes start
app.post(route('subscription/'), (req, res) => {
    subscriptions.subscribe(req.body).then((response) => {
        res.send(response);
    });
});

app.delete(route('subscription/store/:storeId/user/:userId'), (req, res) => {
    const { storeId, userId } = req.params;
    subscriptions.unsubscribe({ storeId, userId }).then((response) => {
        res.send(response);
    });
});
//Subscription routes end


//Product routes start
app.post(route('product/'), (req, res) => {
    products.insert(req.body).then((response) => {
        res.send(response);
    });
});

app.patch(route('product/:id'), (req, res) => {
    products.update({ id: req.params.id, product: req.body }).then((response) => {
        res.send(response);
    });
});

app.patch(route('product/archive/:id'), (req, res) => {
    products.archive(req.params.id).then((response) => {
        res.send(response);
    });
});

app.patch(route('product/restore/:id'), (req, res) => {
    products.restore(req.params.id).then((response) => {
        res.send(response);
    });
});

app.get(route('product/'), (req, res) => {
    products.selectAll().then((response) => {
        res.send(response);
    });
});
//Product routes end


//Order routes start

app.post(route('order/'), (req, res) => {
    orders.insert(req.body).then((response) => {
        res.send(response);
    });
});

app.get(route('order/:orderId'), (req, res) => {
    orders.selectByOrderId(req.params.orderId).then((response) => {
        res.send(response);
    });
});

app.get(route('order/user/:userId/'), (req, res) => {
    orders.selectAllOrdersByUser(req.params.userId).then((response) => {
        res.send(response)
    });
});

app.get(route('order/store/:storeId/'), (req, res) => {
    orders.selectAllOrdersToStore(req.params.storeId).then((response) => {
        res.send(response)
    });
});

//Order routes end





