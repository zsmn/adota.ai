const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists '});

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(200).send({ user });
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

        const token = jwt.sign({ id: user.id }, process.env.SECRET_MD5, {
            expiresIn: 86400
        });

        res.status(200).send({ user, token });
    }
    catch (err){
        return res.status(400).send({ error: 'Login failed'});
    }
})

router.post('/requestuser', async (req, res) => {
    //const { body } = req.body.token;
    const reqToken = req.body.token;
    const parts = reqToken.split(' ');
    const [ bearer, token ] = parts;

    var id = null;
    try{
        jwt.verify(token, process.env.SECRET_MD5, (err, decoded) => {
            if (err)
                return res.status(401).send({error: 'Token invalid'});
    
            id = decoded.id;
        })

        const user = await User.findOne({ _id: id });
        res.status(200).send({ _id: user._id, username: user.username });
    }
    catch (err){
        return res.status(400).send({ error: 'Could not find user' });
    }
})

router.post('/delete', authMiddleware, async (req, res) => {
    try{
        const user = await User.findOne({_id: req.userId})

        if(!user) res.status(400).send({ error: 'Could not find an user with that id' });

        if(user.userId == req.userId){
            await User.deleteOne({ _id: req.userId })
            res.status(200).send({ user });
        }
        else{
            res.status(401).send({ error: 'You dont have authorization for that' });
        }
    }
    catch (err) {
        res.status(400).send({ error: 'Request failed' });
    }
});

module.exports = app => app.use('/auth', router);
