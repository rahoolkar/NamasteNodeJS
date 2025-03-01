const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require('bcrypt');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const isAuthenticated = require("./helpers/authMiddleware");
const isPatchAllowed = require("./helpers/patchMiddleware");

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
app.use(cookieParser());

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
        const token = await jwt.sign({ id : user._id }, 'shhhhh');
        //send the jwt token to the browser as cookie
        res.cookie("token",token,{expires:Date.now()+7*24*60*60*1000,secure:true,maxAge:7*24*60*60*1000,httpOnly:true});
        res.send("user loggin successfully");
    }else{
        throw new Error("Password doesnot match");
    }
})

app.post("/logout",(req,res)=>{
    res.clearCookie('token').send("user logged out :)");
})

app.get("/profile/view",isAuthenticated,async(req,res)=>{
    try{
        let user = req.user;
        res.send(user);
    }catch(error){
        res.status(404).send("something went wrong");
    }
})

app.patch("/profile/edit",isAuthenticated,isPatchAllowed,async(req,res)=>{
    let {_id} = req.user;
    let data = req.body;
    console.log(data);
    await User.findByIdAndUpdate(_id,data);
    res.send("patch req to profile api");
})

app.get("/feed",isAuthenticated,async(req,res)=>{
    try{
        console.log(req.cookies);
        let allListings = await User.find();
        res.send(allListings);
    }catch(error){
        res.status(404).send("something went wrong");
    }
})