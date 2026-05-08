const restaurantModel = require("../models/restaurantModel");
const logger = require("../utils/logger");

// CREATE RESTAURANT
const createRestaurantController = async(req,res)=>{
    try {
        logger.info(`Creating restaurant: ${req.body.title}`);
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
        logger.warn('Restaurant creation failed - Missing required fields');
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
    logger.info(`Restaurant created successfully: ${title}`);

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
    } catch (error) {
        logger.error(`Error creating restaurant: ${error.message}`, { title: req.body?.title, stack: error.stack });
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
        logger.info('Fetching all restaurants');
        const restaurant=await restaurantModel.find({});
        if(!restaurant){
            logger.warn('No restaurants found');
            return res.status(404).send({
                success:false,
                message:"No restaurant found",
            });
        }
        logger.info(`Retrieved ${restaurant.length} restaurants`);
        res.status(200).send({
            success:true,
            totalCount:restaurant.length,
            message:"All restaurant list",
            restaurant
        });
    }
    catch(error){
        logger.error(`Error fetching restaurants: ${error.message}`, { stack: error.stack });
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
        logger.info(`Fetching restaurant with ID: ${restaurantId}`);
        if(!restaurantId){
            logger.warn('Restaurant ID is required');
            return res.status(400).send({
                success:false,                
                message:"Restaurant id is required",
            });
        }
        //find restaurant
        const restaurant=await restaurantModel.findById(restaurantId);
        //validation
        if(!restaurant){
            logger.warn(`Restaurant not found with ID: ${restaurantId}`);
            return res.status(404).send({
                success:false,
                message:"No restaurant found",
            });
        }
        logger.info(`Restaurant found with ID: ${restaurantId}`);
        res.status(200).send({
            success:true,
            message:"Restaurant found",
            restaurant
        });
    }
    catch(error){
        logger.error(`Error fetching restaurant: ${error.message}`, { restaurantId: req.params?.id, stack: error.stack });
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
        logger.info(`Delete request for restaurant ID: ${restaurantId}`);
        if(!restaurantId){
            logger.warn('Restaurant ID is required for deletion');
            return res.status(400).send({
                success:false,                
                message:"Restaurant id is required",
            });
        }
        //find and delete restaurant
        const restaurant=await restaurantModel.findByIdAndDelete(restaurantId);
        //validation
        if(!restaurant){
            logger.warn(`Restaurant not found for deletion - ID: ${restaurantId}`);
            return res.status(404).send({
                success:false,
                message:"No restaurant found",
            });
        }
        logger.info(`Restaurant deleted successfully - ID: ${restaurantId}`);
        res.status(200).send({
            success:true,
            message:"Restaurant deleted successfully",
            restaurant
        });
    }
    catch(error){
        logger.error(`Error deleting restaurant: ${error.message}`, { restaurantId: req.params?.id, stack: error.stack });
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