const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Pet = require('../models/pets.js');

const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
    req.body.userId = req.userId
    
    try{
        const pet = await Pet.create(req.body);

        return res.status(200).send({ pet });
    }
    catch (err) {
        return res.status(400).send({ error: 'Pet registration failed' });
    }
});

router.post('/delete/:petId', authMiddleware, async (req, res) => {
    const _id = req.params.petId.toString()

    try{
        const pet = await Pet.findOne({_id: _id})

        if(!pet) res.status(400).send({ error: 'Could not find an pet with that id '});

        if(pet.userId == req.userId){
            await Pet.updateOne({ _id: _id }, { $set: { deleted: true }})
            res.status(200).send({ pet });
        }
        else{
            res.status(401).send({ error: 'You dont have authorization for that' });
        }
    }
    catch (err) {
        res.status(400).send({ error: 'Request failed' });
    }
});

router.get('/', async (req, res) => {
    try{
        const pets = await Pet.find({ deleted: false });

        return res.status(200).send({ pets });
    }
    catch (err){
        return res.status(400).send({ error: 'Request failed' });
    }
})

module.exports = app => app.use('/pet', router);
