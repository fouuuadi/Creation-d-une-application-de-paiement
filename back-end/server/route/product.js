const express = require("express");
const router = new express.Router();

router.get("/", async(req, res) => {
    try {
        console.log(req.body)
        res.send(200, { content: "ok" })
    } catch (e) {
        console.error(e.message)
    }
})

module.exports = router;