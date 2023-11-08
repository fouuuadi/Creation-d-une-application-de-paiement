const express = require("express");

const router = express.Router();


router.post("/" , async (req, res) => {
    try{
        console.log(req.body)
        res.send(200, {content: "ok"})
    } catch (e) {
        console.error(e.message)
    }
})