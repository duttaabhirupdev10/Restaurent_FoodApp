const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const{
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
}= require("../controllers/foodController");


const router = express.Router();

//routes
//CREATE FOOD
router.post('/create',authMiddleware,createFoodController);
//GET ALL FOODS
router.get("/getAll", getAllFoodsController);
// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD BY RESTURANT
router.get("/getByRestaurant/:id", getFoodByRestaurantController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController);


module.exports = router;