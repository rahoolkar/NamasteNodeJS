const express = require("express");
const app = express();
const User = require("./models/user");
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

app.post("/login",async(req,res)=>{
    try{
        //authenticate the user
        let {email,password} = req.body;
        let isEmail = await validator.isEmail(email);
        if(isEmail==false){
            throw new Error("credentials wrong!! please check again")
        }
        let user = User.find({email : email});
        if(!user){
            throw new Error("Please register again");
        }
        let isValid = await bcrypt.compare(password, user.password);
        if(isValid==true){
            //generate the jwt token
            const token = jwt.sign({ id : user._id }, 'shhhhh');
            res.cookie(token);
            //sent the token to the user browser
        }else{
            throw new Error("credentials wrong!! please check again")
        }
    }catch(error){
        res.status(404).send(error);
    }
})

app.get("/profile",(req,res)=>{

})