const isPatchAllowed = function(req,res,next){
    let data = req.body;
    let allowedFeilds = ["firstname","lastname","age"];
    let isBodyValidate = Object.keys(data).every((feild)=>{
        return allowedFeilds.includes(feild);
    })
    if(!isBodyValidate){
        throw new Error("Update is not possible");
    }else{
        next();
    }
}

module.exports = isPatchAllowed;