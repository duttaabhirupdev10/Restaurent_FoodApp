const JWT =require("jsonwebtoken");

module.exports= async(req,res,next) =>{
    try{
        //get token
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Invalid token"
                });
            }else{
                if (!req.body) req.body = {};
                req.body.id = decoded.id;
                next();
            }
        });


    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "please provide Auth token",
            error
        });
    }
};

// path: middleware/authMiddleware.js
// const JWT =require("jsonwebtoken");