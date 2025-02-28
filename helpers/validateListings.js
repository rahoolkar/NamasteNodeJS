const userJoiSchema = require("../utils/validationSchema");


const validateListing = (req,res,next)=>{
    let data = req.body;
    let result = userJoiSchema.validate(req.body);
    if(result.error){
        throw new Error("Please send proper data in the data feilds");
    }else{
        next();
    }
}

module.exports = validateListing;