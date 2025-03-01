const express = require("express");
const router = express.Router();

router.post("/login",(req,res)=>{
    res.send("login api");
})
router.post("/logout",(req,res)=>{
    res.send("logout api");
})
router.post("/signup",(req,res)=>{
    res.send("signup api");
})

module.exports = router;