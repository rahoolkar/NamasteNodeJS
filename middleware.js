const adminAuth = (req,res,next)=>{
    console.log("middleware of admin");
    let token = "xyz";
    if(token == "xyz"){
        next();
    }else{
        res.status(401).send("error aagaya");
    }
};

const userAuth = (req,res,next)=>{
    console.log("middleware of user");
    let token = "xyz";
    if(token == "xyz"){
        next();
    }else{
        res.status(401).send("error aagaya");
    }
}

module.exports = {adminAuth,userAuth};