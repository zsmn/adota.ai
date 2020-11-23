const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Pet = require('../models/pets.js');

const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
    try{
        const pet = await Pet.create(req.body);

        return res.status(200).send({ pet });
    }
    catch (err) {
        return res.status(400).send({ error: 'Pet registration failed' });
    }
});

router.get('/', async (req, res) => {
    try{
        const pets = await Pet.find({});

        return res.status(200).send({ pets });
    }
    catch (err){
        return res.status(400).send({ error: 'Request failed' });
    }
})

module.exports = app => app.use('/pet', router);