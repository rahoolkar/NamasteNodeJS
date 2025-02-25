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

//middleware used to convert the json-oject to js-object
app.use(express.json());

//to get all the data from the database
app.get("/feed",async(req,res)=>{
    try{
        let emailtofind = req.body.email;
        let listing = await User.find({email : emailtofind});
        if(listing.length>0){
            res.send(listing);
        }else{
            res.status(404).send("User not found");
        }
        //find method will return [] of related answers
        //let listing = await User.findOne({email : emailtofind});
        //findOne method will return {} since it always return one object 
    }catch(error){
        res.status(400).send("something went wrong");
    }
})

//to delete the user from the database
app.delete("/user",async(req,res)=>{
    try{
        let id = req.body.userid;
        await User.findByIdAndDelete(id);
        res.send("user deleted successfully");
    }catch(error){
        res.status(404).send("something went wrong");
    }
})

//to update a user document from the database
app.patch("/user",async(req,res)=>{
    try{    
        let id = req.body.id;
        let data = req.body;
        await User.findByIdAndUpdate(id,data);
        res.send("user updated successfully");

    }catch(error){
        res.status(404).send("something went wrong");
    }
})

//to post a data to the database
app.post("/signup",async (req,res)=>{
    try{
        let data = req.body;

        let newuser = new User(data);

        await newuser.save();
        res.send("data saved sucessfully");
    }catch(error){
        console.log(error);
    }
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/namastenode');
}
