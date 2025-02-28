const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
    firstname : {
        type : String,
        required : true,
        maxLength : 10
    },
    lastname : {
        type : String,
        required : true,
        maxLength : 10
    },
    age:{
        type : Number,
        max : 80,
        default : 18,
        validate : (value)=>{
            if(value<18){
                throw new Error("age must be above 18")
            }
        }
    }, 
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate : (value)=>{
            if(validator.isEmail(value)==false){
                throw new Error ("Invalid Email Address : ",value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate : (value)=>{
            if(validator.isStrongPassword(value)==false){
                throw new Error("Weak Password : ",value)
            }
        }
    }
},{ timestamps: true });

const User = mongoose.model("User",userSchema);

module.exports = User;