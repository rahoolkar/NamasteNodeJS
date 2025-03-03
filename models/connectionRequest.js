const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const connectionRequestSchema = new Schema({
    to : {
        type : Schema.Types.ObjectId,
        required : true
    },
    from : {
        type : Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : ["like","dislike","accepted","rejected"]
    }
},{timestamps : true});

//writing the mongoose pre-middleware - there are many types of middleware
connectionRequestSchema.pre("save",function(next){ //save is a event handler
    const document = this; //this points to the document of the model
    if(document.from.equals(document.to)){
        throw new Error("You cannot send request to yourself");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;