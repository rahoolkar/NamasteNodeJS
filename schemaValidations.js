const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js")

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

//mainly i have to use validations for the post and patch methods
app.post("/user",async(req,res)=>{
    try{
        let data = req.body;
        let newuser = new User(data);
        await newuser.save();
        res.send("User added successfully");
    }catch(error){
        res.status(400).send(error);
    }
})

app.get("/",(req,res)=>{
    res.send("welcome to the schema validations");
})

app.patch("/user/:id",async(req,res)=>{
    try{
        let {id} = req.params;
        let data = req.body;
        //i want that nobody should be allowed to update the email and firstname
        let allowed_feilds = ["lastname","age","password"];
        let isupdate = Object.keys(data).every((elem)=>{
            return allowed_feilds.includes(elem);
        })
        if(isupdate==false){
            throw new Error("Update cannot be possible");
        }
        await User.findByIdAndUpdate(id,data,{runValidators : true});
        res.send("User updated sucessfully");
    }catch(error){
        res.status(404).send(error.message);
    }
})