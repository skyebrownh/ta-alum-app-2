const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    city: String,
    state: String, // state abbreviation
    latitude: Number,
    longitude: Number
});
const Location = mongoose.model('Location', locationSchema);

const memberSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    company: String,
    position: String,
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    },
    email: String,
    linkedIn: String,
    image: String // default: placeholder img
});
const Member = mongoose.model('Member', memberSchema);

module.exports = { Location, Member };