const express = require("express");
const router = new express.Router();
const connection = require("../db")

router.post("/payment", async(req, res) => {
    try {
        const queryPayment = "INSERT ";
        connection.query(queryPayment, (error, results) => {
            if(error) {
                console.error(error);
                res.status(500).send("Erreur lors de l'exécution de la requête SQL.");
            } else {
                res.status(200).json(results);
            }
        });
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Erreur lors de la gestion de la requête.");
    }
});

module.exports = router;