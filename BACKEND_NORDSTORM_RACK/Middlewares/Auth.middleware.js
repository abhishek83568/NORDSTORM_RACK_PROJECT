const jwt=require('jsonwebtoken');
const UserModel = require('../Models/user.model');
const dotenv=require('dotenv').config()

const Auth=(req,res,next)=>{
if(!req.headers.authorization){
    return res.status(404).send(`Token not found`)
}

const token=req.headers.authorization.split(" ")[1];
 
jwt.verify(token,process.env.SECRET_KEY,async function(err, decoded) {
    if(err){
        return res.status(403).send("Invalid token");
    }

    if(decoded){
        const userId=decoded.id;
        const user=await UserModel.findById(userId)
        req.user=user
        next()
    }
  });

}

module.exports=Auth