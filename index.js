const express = require('express');
const route = require('./utils/route.js');
const env = require('./env.js');

//Import table classes 
const Users = require('./tables/users.js')
const Stores = require('./tables/stores.js');
const StoreOwners = require('./tables/store_owners.js');
//End: Import table classes 

//Init table classes
const users = new Users();
const stores = new Stores();
const storeOwners = new StoreOwners();
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

    if (req.method == "POST" || req.method == "PATCH") {
        console.log(`[Request body] ${await req.body}`);
    }

    console.log(`Response : ${await res}`);
    next();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//ROUTES

//User start
app.post(route('user/'), (req, res) => {
    users.insert(req.body).then((response) => {
        res.send(response);
    })
});

app.get(route('user/'), (req, res) => {
    users.selectAll().then((response) => {
        res.send(response);
    });
});

app.get(route('user/:id/'), (req, res) => {
    users.selectById(req.params.id).then((response) => {
        res.send(response);
    });
});

app.get(route('user/firebase/:id/'), (req, res) => {
    users.selectByFirebaseId(req.params.id).then((response) => {
        res.send(response)
    });
});

app.patch(route('user/:id'), (req, res) => {
    users.update({ id: req.params.id, user: req.body }).then((response) => {
        res.send(response);
    });
});
//User end


//Store routes start
app.post(route('store/'), (req, res) => {
    stores.insert(req.body).then((response) => {
        res.send(response);
    });
});
//Store routes end


//Store owners start
app.delete(route('store-owner/store/:storeId/user/:userId'), (req, res) => {
    const params = req.params;
    storeOwners.delete({ storeId: params.storeId, userId: params.userId }).then((response) => {
        res.send(response);
    });
});
//Store owners end





