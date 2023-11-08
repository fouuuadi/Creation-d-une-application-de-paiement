const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database.sql");

const thebradery = require("./route/products");

//middleware qui permet les requêtes HTTP
app.use(cors());

//Cela indique à Express.js de parser automatiquement le corps des requêtes en JSON
app.use(express.json());

//Demarre le serveur sur le port 3306
//Lors du test il faudra mettre votre port
app.listen("3306", () => {
    console.log("server has started")
})

app.use('/thebradery', thebradery);