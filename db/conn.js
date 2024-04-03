require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGOD_CONNECT_URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

module.exports = db;
