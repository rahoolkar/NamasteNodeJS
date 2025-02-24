const express = require("express");
const {adminAuth,userAuth} = require("./middleware");
const app = express();


//defining a middleware
app.use("/route",(req,res,next)=>{
    console.log("middleware-1");
    next();
})

//passing multiple handlers to one route
app.get("/route",(req,res,next)=>{
    console.log("route-1")
    next();
},(req,res,next)=>{
    console.log("route-2")
    next();
},(req,res)=>{
    console.log("route-3")
    res.send("Route handled");
})

//req->m1->m2->m3->req handler 

//middleware for the admin route

app.use("/admin",adminAuth)

app.get("/admin/getdata",(req,res)=>{
    res.send("all data");
})

app.delete("/admin/deletedata",(req,res)=>{
    res.send("deleted data");
})

app.get("/user/getdata",userAuth,(req,res)=>{
    res.send("get user data");
})

app.post("/user/login",(req,res)=>{
    res.send("login page");
})

app.listen(7777,()=>{
    console.log("app is running on port 7777");
})