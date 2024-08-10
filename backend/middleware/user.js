const JWT=require("jsonwebtoken");
const secret = require("../config");

function authmiddle(req,res,next){ 
    const authtoken=req.headers.authorization;
    if(!authtoken || !authtoken.startsWith('Bearer ')){
        return res.json({
            msg:"no acess"
        })


    }
    const auth=authtoken.split(' ')[1];

    try{
        const decoded=JWT.verify(auth,secret);
        req.userId=decoded.userId;
        console.log(decoded);
        
        next();
       


    }
    catch(err){
        return res.status(403).json({err});
    }
      
}






module.exports={
    authmiddle
}