const mongoose = require('mongoose');
const { connectionString } = require('../config');
// const { Location, Member } = require('./models');

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`connected on ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectdb;