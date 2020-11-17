// server.js
console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
var db = null; 
var pets = null;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

MongoClient.connect(process.env.MONGO_USR, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('adota-ai')
    pets = db.collection('pets')
  })

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    db.collection('pets').find().toArray()
    .then(results => {
      res.render('index.ejs', { pets: results })
    })
    .catch(error => console.error(error))
})

app.post('/pets', (req, res) => {
    pets.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
})
  
app.put('/pets', (req, res) => {
    pets.findOneAndUpdate(
        { name: 'Zildao' },
        {
            $set: {
              name: req.body.name,
              desc: req.body.desc
            }
        },
        {
            upsert: true
        }
    )
    .then(result => console.log("Updated Zildao successfuly"))
    .catch(error => console.error(error))
})

app.delete('/pets', (req, res) => {
    pets.deleteOne(
        { name: 'Zildao' }
    )
    .then(result => {
        if (result.deletedCount === 0) {
            return res.json('No zildao to delete')
        }
        res.json(`Zildao deleted`)
    })
    .catch(error => console.error(error))
})
