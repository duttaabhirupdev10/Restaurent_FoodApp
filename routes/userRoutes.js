const express = require('express');
const {getUserController, updateUserController, updatePasswordController, resetPasswordController}=require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes
//GET USER || GET
router.get('/getUser',authMiddleware ,getUserController);

//UPDATE PROFILE
router.put('/updateUser',authMiddleware , updateUserController);

//password update
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

module.exports = router;