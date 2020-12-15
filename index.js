const express = require('express');
const router = require('./utils/route.js');
const env = require('./env.js');

//Import table classes 
const Users = require('./tables/users.js')

//End: Import table classes 

//Init table classes
const users = new Users();
// End: Init Tables


const app = express();

//Middleware that assembles json sent in post request
const bodyParser = require('body-parser');

const PORT = env.PORT;

//Add Middleware

//Parse json responses to objects 
app.use(bodyParser.json());

// Custom middleware
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(`Response : ${res}`);
    next();
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//ROUTES

//User
app.post(router('user/'), (req, res) => {
    users.insert(req.body).then((response) => {
        res.send(response);
    })
});

app.get(router('user/'), (req, res) => {
    users.selectAll().then((response) => {
        res.send(response);
    });
});

app.get(router('user/:id/'), (req, res) => {
    users.selectById(req.params.id).then((response) => {
        res.send(response);
    });
});

app.get(router('user/firebase/:id/'), (req, res) => {
    users.selectByFirebaseId(req.params.id).then((response) => {
        res.send(response)
    });
});

app.patch(router('user/:id'), (req, res) => {
    console.log(req.body);
    users.update({ id: req.params.id, user: req.body }).then((response) => {
        res.send(response);
    });
});










