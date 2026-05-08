const foodModel=require("../models/foodModel");
const orderModel=require("../models/orderModel");
const logger = require("../utils/logger");

//CREATE FOOD
const createFoodController= async(req,res)=>{
    try{
        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating}=req.body;
        logger.info(`Creating food item: ${title}`);

        //validation
        if(!title || !description || !price || !restaurant){
            logger.warn('Food creation failed - Missing required fields');
            return res.status(400).send({
                success:false,
                message:"All fields are required"
            })
        }
        const newFood=new foodModel({title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating});
        await newFood.save();
        logger.info(`Food item created successfully: ${title}`);
        res.status(201).send({
            success:true,
            message:"Food created successfully",
            newFood
        });
    }
    catch(error){
        logger.error(`Error creating food: ${error.message}`, { title: req.body?.title, stack: error.stack });
        res.status(500).send({
            success:false,
            message:"Error in creating food",
            error
        });
    }

}

//GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    logger.info('Fetching all food items');
    const foods = await foodModel.find({});
    if (!foods) {
      logger.warn('No food items found');
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    logger.info(`Retrieved ${foods.length} food items`);
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    logger.error(`Error fetching foods: ${error.message}`, { stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    logger.info(`Fetching food item with ID: ${foodId}`);
    if (!foodId) {
      logger.warn('Food ID is required');
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      logger.warn(`Food item not found with ID: ${foodId}`);
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    logger.info(`Food item found with ID: ${foodId}`);
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    logger.error(`Error fetching food: ${error.message}`, { foodId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

// GET FOOD BY RESTURANT
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    logger.info(`Fetching food items for restaurant ID: ${restaurantId}`);
    if (!restaurantId) {
      logger.warn('Restaurant ID is required');
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      logger.warn(`No food items found for restaurant ID: ${restaurantId}`);
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
    logger.info(`Retrieved food items for restaurant ID: ${restaurantId}`);
    res.status(200).send({
      success: true,
      message: "food base on restuarant",
      food,
    });
  } catch (error) {
    logger.error(`Error fetching food by restaurant: ${error.message}`, { restaurantId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

// UPDATE FOOD ITEM
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    logger.info(`Updating food item with ID: ${foodID}`);
    if (!foodID) {
      logger.warn('Food ID is required for update');
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      logger.warn(`Food item not found for update - ID: ${foodID}`);
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      },
      { new: true }
    );
    logger.info(`Food item updated successfully - ID: ${foodID}`);
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    logger.error(`Error updating food: ${error.message}`, { foodId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Erorr In Update Food API",
      error,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    logger.info(`Delete request for food item ID: ${foodId}`);
    if (!foodId) {
      logger.warn('Food ID is required for deletion');
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      logger.warn(`Food item not found for deletion - ID: ${foodId}`);
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    logger.info(`Food item deleted successfully - ID: ${foodId}`);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted ",
    });
  } catch (error) {
    logger.error(`Error deleting food: ${error.message}`, { foodId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Eror In Delete Food APi",
      error,
    });
  }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    logger.info(`Place order request from user ID: ${req.body.id}`);
    if (!cart) {
      logger.warn(`Place order failed - Empty cart for user ID: ${req.body.id}`);
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    logger.info(`Order placed successfully for user ID: ${req.body.id}, Total: ${total}`);
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    logger.error(`Error placing order: ${error.message}`, { userId: req.body?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    logger.info(`Update order status request for order ID: ${orderId}`);
    if (!orderId) {
      logger.warn('Order ID is required for status update');
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    logger.info(`Order status updated successfully - Order ID: ${orderId}, New Status: ${status}`);
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    logger.error(`Error updating order status: ${error.message}`, { orderId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};

module.exports={
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};

