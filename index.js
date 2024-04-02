require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const router = require('./routes/routes');
const db = require('./db/conn');

app.use("/", express.json(), router);

app.use(express.static(path.join(__dirname, "client")));

db.on("error", () => {
    console.log("Falha ao conectar ao banco de dados");
});
db.once("open", () => {
    console.log("Banco de dados acessado com sucesso!");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})