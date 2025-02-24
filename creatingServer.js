const express = require("express");
const app = express();


//CRUD operations
app.get("/user",(req,res)=>{
    res.send("get request aagyi");
})

app.post("/user",(req,res)=>{
    res.send("post request aagyi");
})

app.put("/user",(req,res)=>{
    res.send("put request aagyi");
})

app.delete("/user",(req,res)=>{
    res.send("delete request aagyi");
})

//server is listening
app.listen(7777,()=>{
    console.log("app is running on port 7777");
})