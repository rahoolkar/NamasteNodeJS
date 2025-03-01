const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuthenticated = async (req,res,next)=>{
    try{
        let {token} = req.cookies;
        if(!token){
            throw new Error("Token is missing");
        }
        const decoded = await jwt.verify(token, 'shhhhh');
        let {id} = decoded;
        let user = await User.findById(id);
        if(!user){
            throw new Error("User not found :(")
        }else{
            req.user = user;
            next();
        }
    }catch(error){
        res.status(404).send("bad Request :(");
    }
}

module.exports = isAuthenticated;