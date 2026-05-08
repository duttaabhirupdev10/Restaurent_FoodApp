const JWT =require("jsonwebtoken");
const logger = require('../utils/logger');

module.exports= async(req,res,next) =>{
    try{
        //get token
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            logger.warn('Authorization header missing or invalid for request');
            return res.status(401).send({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                logger.warn(`Invalid token verification attempt: ${err.message}`);
                return res.status(401).send({
                    success: false,
                    message: "Invalid token"
                });
            }else{
                logger.info(`Token verified for user ID: ${decoded.id}`);
                if (!req.body) req.body = {};
                req.body.id = decoded.id;
                next();
            }
        });


    }catch(error){
        logger.error(`Authentication middleware error: ${error.message}`, { stack: error.stack });
        res.status(500).send({
            success: false,
            message: "please provide Auth token",
            error
        });
    }
};

// path: middleware/authMiddleware.js
// const JWT =require("jsonwebtoken");