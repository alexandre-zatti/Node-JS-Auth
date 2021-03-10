const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
let router = express.Router();

router.route("/").post((req,res) =>{
    const { email, username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) =>{
        const userModel = new User({
            email: email,
            username: username,
            password: hash
        });

        userModel.save().then((result) =>{
            res.json({msg:"Usuario registrado com sucesso!"})
        }).catch((err) =>{
            if(err){
                res.status(400).json({ error:err })
            }
        });
    });
});

module.exports = router;