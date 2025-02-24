const express = require("express");
const app = express();

app.get("/test",(req,res)=>{
    try{
        abcd = abcd ; //this will call the deafult error handler of express
        res.send("test route");
    }catch(err){
        next(err); //calling the error handling middleware
    }
})

//defining our own error handling middleware 
app.use("/",(err,req,res,next)=>{ //order is very important 
    console.log(err.message); //writing the error handling middleware at the end is very important
    res.status(500).send(err.message);
})

app.listen(7777,()=>{
    console.log("app is listening on port 7777");
})