const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const validateListing = require("./helpers/validateListings");
const bcrypt = require('bcrypt');
var validator = require('validator');

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

app.post("/signup",validateListing,async(req,res)=>{
    try{
        let {firstname,lastname,age,email,password} = req.body;

        let hashedPassword = await bcrypt.hash(password, 10);

        let newuser = new User({firstname,lastname,age,email});
        newuser.password = hashedPassword;

        await newuser.save();

        res.send("user added successfully");
    }catch(error){
        res.status(404).send(error.message);
    }
})

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
        res.send("user loggin successfully");
    }else{
        throw new Error("Password doesnot match");
    }
})

