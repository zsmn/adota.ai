const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js');

const authConfig = require('../config/auth.json')
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists '});

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });
    }
    catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ username }).select('+password');

        if(!user)
            return res.status(400).send({ error: 'User not found'});

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: 'Invalid password'});

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400
        });

        res.send({ user, token });
    }
    catch (err){
        return res.status(400).send({ error: 'Login failed'});
    }
})

router.get('/authenticate', async (req, res) => {
    //const { body } = req.body.token;
    const reqToken = req.body.token;
    const parts = reqToken.split(' ');
    const [ bearer, token ] = parts;

    var id = null;
    try{
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err)
                return res.status(401).send({error: 'Token invalid'});
    
            id = decoded.id;
        })

        const user = await User.findOne({ _id: id });
        res.send({ username: user.username });
    }
    catch (err){
        return res.status(400).send({ error: 'Could not find user' });
    }
})

module.exports = app => app.use('/auth', router);