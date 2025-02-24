const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    age:{
        type : Number
    }, 
    email : {
        type : String
    },
    password : {
        type : String
    }
});

const User = mongoose.model("User",userSchema);

module.exports = User;