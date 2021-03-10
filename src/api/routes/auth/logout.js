const express = require("express");
let router = express.Router();

router.route("/").get((req,res) =>{
    res.cookie('access-token','', {maxAge:1});
    res.redirect("/");
});

module.exports = router;