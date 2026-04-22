//GET USER INFGO
const userModel = require('../models/userModel');

const getUserController = async (req, res) => {
  try{
    //find user
    const user = await userModel.findById(req.body.id);
    //validation
    if(!user){
        return res.status(404).send({
            success: false,
            message: "User not found"
        });
    }
    //hide password
    user.password=undefined;
    //resp
    res.status(200).send({
        success: true,
        message: "User data retrieved successfully",
        user
    });
  } catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in get user API",
        error
    })
  }
};

//UPDATE USER
const updateUserController=async(req,res)=>{
  try{
    //find user
    const user=await userModel.findById({_id: req.body.id});
    //validation
    if(!user){
        return res.status(404).send({
            success: false,
            message: "User not found"
        });
    }
    //update user
    const {userName,address,phone}=req.body;
    if(userName) user.userName=userName;
    if(address) user.address=address;
    if(phone) user.phone=phone;
    await user.save();
    //resp
    res.status(200).send({
        success: true,
        message: "User updated successfully",
        updatedUser: user
    });
  }
  catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in update user API",
        error
    })
  }
}
// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
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
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
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
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
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
    res.status(200).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      error,
    });
  }
};

module.exports={ getUserController, updateUserController, updatePasswordController, resetPasswordController };
