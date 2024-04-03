require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOD_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

module.exports = db;
