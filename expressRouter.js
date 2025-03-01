const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const profileRouter = require("./routes/ProfileRoutes");
const authRouter = require("./routes/AuthRoutes");

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

//Authentication APIs
app.use("/",authRouter);

//Profile APIs
app.use("/profile",profileRouter);

//User APIs
app.use("/user",userRouter);



