const express = require('express')
const router = require('./utils/router.js')
const env = require('./env')


//Database and Tables 
const db = require('./mysql/db.js');
const Users = require('./mysql/users.js')

//Init Tables
const users = new Users();

// End: Init Tables


const app = express();

//Middleware that assembles json sent in post request
const bodyParser = require('body-parser')

const PORT = env.PORT;

//Add Middleware

//Parse json responses to objects 
app.use(bodyParser.json());

//Allow cross origin requests
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//ROUTES

//User
app.post(router('user/'), (req, res) => {
    users.insert(req.body, res);
    console.log(req.body);
});

app.get(router('user/:id/'), (req, res) => {
    users.selectById(req.params.id, res);
});

app.get(router('user/firebase/:id/'), (req, res) => {
    users.selectByFirebaseId(req.params.id, res);
});

app.put(router('users/'), (req, res) => {
    console.log(req.body);
    let response = users.select({ id: req.params.id, user: req.body });
    res.send(response);
});






