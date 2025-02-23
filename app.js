const express = require("express");
const app = express();

app.use("/dev",(req,res)=>{
    res.send("dev route");
})

app.use("/test",(req,res)=>{
    res.send("test route");
})

app.listen(7777,()=>{
    console.log("app is running on port 7777");
})