const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("./config");
const { User } = require("./db");

const authMiddleware = async (req,res,next)=>{
    const token = req.headers.authentication.split(" ")[1];
    const uname = jwt.verify(token,JWT_SECRET);
    const user = await User.findOne({username:uname});
    if(user){
        req.body.username = uname
        req.body.userId = user._id
        next();
    }
    else {
        res.status(403).json({msg:'Error Occurred'})
    }
}

module.exports = {authMiddleware}