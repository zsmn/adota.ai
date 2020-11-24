const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Event = require('../models/events.js');

const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
    try{
        const event = await Event.create(req.body);
        return res.status(200).send({ event });
    }
    catch (err) {
        return res.status(400).send({ error: 'Event registration failed' });
    }
});

router.get('/', async (req, res) => {
    try{
        const events = await Event.find({});

        return res.status(200).send({ events });
    }
    catch (err){
        return res.status(400).send({ error: 'Request failed' });
    }
})

module.exports = app => app.use('/event', router);