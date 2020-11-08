const express = require('express')

const app = express();

//Middleware that assembles json sent in post request
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


const db = require('./mysql/db');

//Init Tables

const Users = require('./mysql/users.js')

const users = new Users();

app.use(bodyParser.json());


//Init routes
app.post('/users/', (req, res) => {
    let response = users.insert(req.body);
    console.log(req.body);
    res.send(response);
});

app.get('/users/:id/', (req, res) => {
    let sql = users.selectById(req.params.id);

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/users/:id', (req, res) => {
    console.log(req.body);
    let response = users.update({ id: req.params.id, user: req.body });
    res.send(response);
});






