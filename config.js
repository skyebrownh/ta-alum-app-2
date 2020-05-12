const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

module.exports = {
  connectionString: env.CONNECTION_STRING,
  googleApiKey: env.GOOGLE_API_KEY
};
