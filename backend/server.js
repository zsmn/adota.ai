// server.js
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
var db = null; 
var pets = null;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

MongoClient.connect(process.env.MONGO_USR, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('adota-ai')
    pets = db.collection('pets')
})
.catch(error => console.error(error))

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!')
})

app.get('/', (req, res) => {

})

app.get('/pets', (req, res) => {
    res.json(JSON.stringify(db.collection('pets').find().toArray()))
})

app.post('/pets', (req, res) => {

})
  
app.put('/pets', (req, res) => {

})

app.delete('/pets', (req, res) => {

})
