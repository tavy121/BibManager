const jwt = require('jsonwebtoken');


module.exports = (req, res, next) =>{
    try{
        //const token = req.header.authorization.split(" ")[1]; if I wanted to pass the token in the header (modify req.body.token with token)
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(410).json({
            message: 'Authentification failed'
        });
    }

    
};