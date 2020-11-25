const mongoose = require('../database');

const EventSchema = new mongoose.Schema({
    eventDate: {
        type: Date,
        required: true
    },
    generalInfo: {
        type: String,
        required: true
    },
    extraInfo:{
        type: String,
        required: true
    },
    ownerContact:{
        type: String,
        required: true
    },
    photos: {
        type: Array,
        contentType: Buffer,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;