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

/// pets
// get
app.get('/pets', (req, res) => {
    db.collection('pets').find().toArray()
    .then(results => {
      res.json(results)
    })
    .catch(error => console.error(error))
})

// options
app.options('/pets', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    return res.send("Hello!")
})

// post
app.post('/pets', (req, res) => {
    pets.insertOne(req.body)
    .then(result => {
        console.log("Registered")
    })
    .catch(error => console.error(error))
})

// put
app.put('/pets', (req, res) => {

})

// delete
app.delete('/pets', (req, res) => {

})

/// events
// get
app.get('/events', (req, res) => {
    db.collection('events').find().toArray()
    .then(results => {
      res.json(results)
    })
    .catch(error => console.error(error))
})

// options
app.options('/events', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    return res.send("Hello!")
})

// post
app.post('/events', (req, res) => {

})

// put
app.put('/events', (req, res) => {

})

// delete
app.delete('/events', (req, res) => {

})
