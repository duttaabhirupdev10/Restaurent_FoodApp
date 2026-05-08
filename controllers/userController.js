const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    logger.info(`Fetching user info for user ID: ${req.body.id}`);
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      logger.warn(`User not found for ID: ${req.body.id}`);
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hinde password
    user.password = undefined;
    logger.info(`User info fetched successfully for ID: ${req.body.id}`);
    //resp
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    logger.error(`Error fetching user info: ${error.message}`, { userId: req.body?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Eror in Get User API",
      error,
    });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    logger.info(`Updating user for ID: ${req.body.id}`);
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      logger.warn(`User not found for update - ID: ${req.body.id}`);
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    logger.info(`User updated successfully - ID: ${req.body.id}`);
    res.status(200).send({
      success: true,
      message: "USer Updated SUccessfully",
    });
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`, { userId: req.body?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Error In Udpate Userr API",
      error,
    });
  }
};

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    logger.info(`Password update attempt for user ID: ${req.body.id}`);
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      logger.warn(`User not found for password update - ID: ${req.body.id}`);
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      logger.warn(`Missing password fields for user ID: ${req.body.id}`);
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      logger.warn(`Invalid old password for user ID: ${req.body.id}`);
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    logger.info(`Password updated successfully for user ID: ${req.body.id}`);
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    logger.error(`Error updating password: ${error.message}`, { userId: req.body?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    logger.info(`Password reset attempt for email: ${email}`);
    if (!email || !newPassword || !answer) {
      logger.warn(`Password reset failed - Missing fields for email: ${email}`);
      return res.status(500).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      logger.warn(`Password reset failed - User not found or invalid answer for email: ${email}`);
      return res.status(500).send({
        success: false,
        message: "User Not Found or invlaid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    logger.info(`Password reset successfully for email: ${email}`);
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    logger.error(`Error in password reset: ${error.message}`, { email: req.body?.email, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};

//DELETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    logger.info(`Delete profile request for user ID: ${req.body.id}`);
    await userModel.findByIdAndDelete( req.body.id );
    logger.info(`Profile deleted successfully for user ID: ${req.body.id}`);
    return res.status(200).send({
      success: true,
      message: "Profile Deleted Successfully",
    });
  } 
  catch (error) {
    logger.error(`Error deleting profile: ${error.message}`, { userId: req.body?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
}
 

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};