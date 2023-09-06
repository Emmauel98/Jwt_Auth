const jwt = require('jsonwebtoken');
const login = require('../controller/loginUser');


const AuthenticateToken = async (req,res,next)=>{
    try {
           //verify Token
    const AuthHeader = req.headers.authorization;
    const token = AuthHeader.split(' ')[1];
    const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(verifyToken);
    if (!verifyToken) {
        return res.json({msg: 'Invalid token'})
    }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    next()
}
module.exports = AuthenticateToken;
