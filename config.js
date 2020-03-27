const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
    connectionString: env.CONNECTION_STRING
};