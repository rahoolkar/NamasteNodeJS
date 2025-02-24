const express = require("express");
const app = express();

app.get("/test",(req,res)=>{
    abcd = abcd ; //this will call the deafult error handler of express
    res.send("test route");
})

//defining our own error handling middleware 
app.use("/",(err,req,res,next)=>{ //order is very important 
    console.log(err.message);
    res.status(500).send(err.message);
})

app.listen(7777,()=>{
    console.log("app is listening on port 7777");
})