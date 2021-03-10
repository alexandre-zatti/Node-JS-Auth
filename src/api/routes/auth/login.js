const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const {createTokens} = require("../../services/JWT");

let router = express.Router();

router.route("/").get( async (req,res) =>{
    
    const { username, password} = req.body;
    const user = await User.findOne({username: username}).exec();

    if(!user){
        res.status(400).json({error: "Usuario informado nao existe"});
    }

    const userPassword = user.password;
    bcrypt.compare(password,userPassword).then((match) =>{
        
        if(!match){
            res.status(400).json({error: "Combinacao de usuario e senha esta incorreta!"});
        }else{
            const acessToken = createTokens(user);
            res.cookie("access-token", acessToken, { maxAge: 2592000000, httpOnly: true});
            res.json({msg:"Login efetuado com sucesso!"});
        }
    });
 
});

module.exports = router;