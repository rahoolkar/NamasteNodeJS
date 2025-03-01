const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("profile get api");
})
router.post("/",(req,res)=>{
    res.send("profile post api");
})
router.patch("/:id",(req,res)=>{
    res.send("profile api");
})
router.patch("/:id/password",(req,res)=>{
    res.send("profile password api");
})
router.delete("/:id",(req,res)=>{
    res.send("profile delete api");
})

module.exports = router;