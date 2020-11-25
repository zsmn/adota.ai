const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Event = require('../models/events.js');

const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
    req.body.userId = req.userId

    try{
        const event = await Event.create(req.body);
        return res.status(200).send({ event });
    }
    catch (err) {
        return res.status(400).send({ error: 'Event registration failed' });
    }
});

router.post('/delete/:eventId', authMiddleware, async (req, res) => {
    const _id = req.params.eventId.toString()
    
    try{
        const event = await Event.findOne({_id: _id})

        if(!event) res.status(400).send({ error: 'Could not find an event with that id '});

        if(event.userId == req.userId){
            await Event.updateOne({ _id: _id }, { $set: { deleted: true }})
            res.status(200).send({ event });
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
        const events = await Event.find({ deleted: false });

        return res.status(200).send({ events });
    }
    catch (err){
        return res.status(400).send({ error: 'Request failed' });
    }
})

module.exports = app => app.use('/event', router);