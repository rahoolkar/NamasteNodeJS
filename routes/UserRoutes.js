const express = require("express");
const router = express.Router();

router.get("/feed",(req,res)=>{
    res.send("feed api");
})
router.get("/requests",(req,res)=>{
    res.send("user request api");
})
router.get("/connections",(req,res)=>{
    res.send("user connections api");
})
router.get("/notifications",(req,res)=>{
    res.send("user notification api")
})

module.exports = router;