const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    },
    password : {
        type : String,
        required : true
    }
},{ timestamps: true });

const User = mongoose.model("User",userSchema);

module.exports = User;