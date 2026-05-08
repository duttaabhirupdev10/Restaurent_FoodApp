const userModel = require('../models/userModel');
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");
const logger = require('../utils/logger');

//REGISTER
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body;
        logger.info(`Registration attempt for email: ${email}`);
        //validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            logger.warn(`Registration failed for email: ${email} - Missing fields`);
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        // check user
        const existing = await userModel.findOne({ email });
        if (existing) {
            logger.warn(`Registration failed - Email already registered: ${email}`);
            return res.status(400).send({
                success: false,
                message: "Email already registered, please login"
            });
        }
        //hashing password
        var salt=bcrypt.genSaltSync(10);
        const hashPassword= await bcrypt.hash(password,salt);
        // create new user
        const user = await userModel.create({ userName, email, password: hashPassword, phone, address,answer });
        logger.info(`User registered successfully: ${email}`);
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        logger.error(`Registration error: ${error.message}`, { email: req.body?.email, stack: error.stack });
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error
        })
    }
};

const loginController= async (req, res ) =>{
    try{
        const{email,password} =req.body;
        logger.info(`Login attempt for email: ${email}`);
        //validation
        if(!email || !password){
            logger.warn('Login failed - Missing email or password');
            return res.status(500).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            logger.warn(`Login failed - User not found: ${email}`);
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //check user password | compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            logger.warn(`Login failed - Invalid password for email: ${email}`);
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            })
        }
        //token
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        user.password=undefined;
        logger.info(`User logged in successfully: ${email}`);
        
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user
        })
    } catch(error){
        logger.error(`Login error: ${error.message}`, { email: req.body?.email, stack: error.stack });
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        })
    }
}

module.exports = { registerController, loginController };
