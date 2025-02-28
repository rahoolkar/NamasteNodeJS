const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require('bcrypt');
var validator = require('validator');
var jwt = require('jsonwebtoken');

main().then(()=>{
    //first connect to the db and then listen
    console.log("db connected successfully")
    app.listen(3000,()=>{
        console.log("app is running on port 3000");
    });
}).catch((error)=>{
    console.log(error);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/namastenode');
};

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    let isValidated = validator.isEmail(email);
    if(isValidated==false){
        throw new Error("Please enter proper email");
    }

    let user = await User.findOne({email : email});
    if(!user){
        throw new Error("Plese register first");
    }

    let isLoggined = await bcrypt.compare(password, user.password);
    if(isLoggined==true){
        //generate the jwt token
        const token = jwt.sign({ id : user._id }, 'shhhhh');
        console.log(token);
        //send the jwt token to the browser as cookie
        res.cookie("token",token);
        res.send("user loggin successfully");
    }else{
        throw new Error("Password doesnot match");
    }
})