const path = require('path');

// Parse the .env file
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

// Mongo connection
const MONGO_URI = process.env.MONGO_URI;
const DB_PORT = process.env.PORT;

// Token secret key
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  MONGO_URI,
  DB_PORT,
  ACCESS_TOKEN_SECRET,
};
