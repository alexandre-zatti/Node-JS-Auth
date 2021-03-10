const express = require("express");
const {validateToken} = require("../services/JWT");
let router = express.Router();

router.route("/").get(validateToken,(req,res) =>{
    res.send('hello root profile');
});

module.exports = router;