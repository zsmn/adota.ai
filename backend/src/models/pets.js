const mongoose = require('../database');

const PetSchema = new mongoose.Schema({
    animalName: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    photos: {
        type: Array,
        contentType: Buffer,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;