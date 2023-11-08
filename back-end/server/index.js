const express = require("express");
const cors = require("cors");
const app = express();
const thebradery = require("./route/product");
const router = require("./route/product")

//middleware qui permet les requêtes HTTP
app.use(cors({
    origin: 'http://localhost:3000',
  }));

app.use(router);

//Cela indique à Express.js de parser automatiquement le corps des requêtes en JSON
app.use(express.json());
app.use('/thebradery', thebradery);
//Demarre le serveur sur le port 3306
//Lors du test il faudra mettre votre port
app.listen("3001", () => {
    console.log("server has started")
})