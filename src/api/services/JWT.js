const { sign, verify} = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createTokens = (user) => {
    const acessToken = sign({ id: user.id, username: user.username }, secret);
    return acessToken;
};

const validateToken = (req,res,next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken){
        return res.status(400).json({error : "Usuario nao autenticado!"});
    }

    try {
        const validToken = verify(accessToken,secret);
        
        if(validToken){
            req.authenticated = true;
            return next();
        }

    } catch (err) {
        res.status(400).json({error: err});
    }
}

module.exports = { createTokens, validateToken };
