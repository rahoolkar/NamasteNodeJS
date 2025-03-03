const express = require("express");
const isAuthenticated = require("../helpers/authMiddleware");
const router = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.post("/request/send/:status/:toid",isAuthenticated,async(req,res)=>{
    try{
        let from = req.user;
        let fromUserExists = await User.findById(from);
        if(!fromUserExists){
            throw new Error("User doesnot exists");
        }

        let to = req.params.toid;
        let toUserExists = await User.findById(to);
        if(!toUserExists){
            throw new Error("User doesnot exists");
        }

        let status = req.params.status;
        let allowedStatus = ["like","dislike"];
        if(allowedStatus.includes(status)==false){
            throw new Error("Invalid Status");
        }

        //to check of there is already an existing connection request 
        let isExists = await ConnectionRequest.findOne({$or : [{from : from,to : to},{from : to, to : from}]});
        if(isExists){
            throw new Error("You have already sent request to this user");
        }
        
        let newConnectRequest = new ConnectionRequest({from,to,status});
        let node = await newConnectRequest.save();

        res.send(node);
    }catch(error){
        res.status(400).send(error.message);
    }
})

module.exports = router;