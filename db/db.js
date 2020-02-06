const mongoose = require('mongoose');
const { connectionString } = require('../config');
const { Location, Member } = require('./models');


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected...'))
    .catch(err => console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // query saved documents
    Location.findOne({ city: 'Lexington' }, (err, res) => {
        console.log(`Lexington found: ${res}`);
    });
});
