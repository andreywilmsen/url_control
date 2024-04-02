const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://root:Andrey1309.@cluster0.nhew8ef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

module.exports = db;