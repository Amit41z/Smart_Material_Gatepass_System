const JWT = require('jsonwebtoken');


function userMiddleware(req,res,next){
    const token = req.headers['authorization'];

    try{
        if(token){
            const decoded = JWT.verify(token,'secret');
            req.user = {personalNumber:decoded.personalNumber ,designation:decoded.designation };
            next();
        }
    }catch(err){
        return res.status(404).json({"msg":"middleware error"});
    }
}

module.exports = userMiddleware;