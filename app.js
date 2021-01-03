const express = require('express');
const {Client} = require('pg');
const connectionString = 'postgres://tujnfchbsgxwrn:151ce1735f91784ef1b15fd0d204923c5d863eb1aa2a47f8803aabeff56d0d8c@ec2-52-213-173-172.eu-west-1.compute.amazonaws.com:5432/da43g7rmjqaks6'


const client = new Client({
    connectionString : connectionString

});

client.connect();

var app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', function(req, res, next) {
client.query('SELECT * FROM users WHERE id = $1', [1], function(err, result) {

    if (err) {

       console.log(err);
       res.status(400).send(err); 
    }
    res.status(200).send(result.rows);
    console.log(result.rows);


});


});

app.listen(4000, function(){

console.log("Server is running on port 4000");
});

