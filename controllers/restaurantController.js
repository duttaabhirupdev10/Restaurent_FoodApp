const restaurantModel = require("../models/restaurantModel");

// CREATE RESTAURANT
const createRestaurantController = async(req,res)=>{
    try {
         const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"Please provide all the required fields",
        });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating restaurant",
            error
        });
    }
};

//GET ALLL RESTAURANT
const getAllRestaurantController = async(req,res)=>{
    try{
        const restaurant=await restaurantModel.find({});
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"No restaurant found",
            });
        }
        res.status(200).send({
            success:true,
            totalCount:restaurant.length,
            message:"All restaurant list",
            restaurant
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting restaurant",
            error
        });
    }
};

//GET RESTAURANT BY ID
const getRestaurantByIdController = async(req,res)=>{
    try{
        const restaurantId=req.params.id;
        if(!restaurantId){
            return res.status(400).send({
                success:false,                
                message:"Restaurant id is required",
            });
        }
        //find restaurant
        const restaurant=await restaurantModel.findById(restaurantId);
        //validation
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"No restaurant found",
            });
        }
        res.status(200).send({
            success:true,
            message:"Restaurant found",
            restaurant
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting restaurant",
            error
        });
    }
};

//DELETE RESTAURANT
const deleteRestaurantController = async(req,res)=>{
    try{
        const restaurantId=req.params.id;
        if(!restaurantId){
            return res.status(400).send({
                success:false,                
                message:"Restaurant id is required",
            });
        }
        //find and delete restaurant
        const restaurant=await restaurantModel.findByIdAndDelete(restaurantId);
        //validation
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"No restaurant found",
            });
        }
        res.status(200).send({
            success:true,
            message:"Restaurant deleted successfully",
            restaurant
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting restaurant",
            error
        });
    }
};

module.exports = {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController,
}