const mongoose = require('mongoose');
const express = require("express");
const app = express();
const User = require("./models/user");


main().then(()=>{
    //first connect to the db and then listen
    console.log("db connected successfully")
    app.listen(3000,()=>{
        console.log("app is running on port 3000");
    });
}).catch((error)=>{
    console.log(error);
});

app.post("/signup",async (req,res)=>{
    let userobj = {
        firstname : "Udayan",
        lastname : "Kar",
        age : 17,
        email : "udayankar@gmail.com",
        password : "1234"
    }

    //creating a new instance of user model
    const newuser = new User(userobj);

    await newuser.save();
    res.send("user added succesfully in the database")
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/namastenode');
}
