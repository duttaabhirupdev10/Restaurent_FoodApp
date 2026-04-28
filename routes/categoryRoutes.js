const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const{
    createCategoryController,
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController,
}= require("../controllers/categoryController");


const router = express.Router();

//routes
//CREATE CATEGORY
router.post('/create',authMiddleware,createCategoryController);

// UPDATE CAT
router.put("/update/:id", authMiddleware, updateCategoryController);

// DLEETE CAT
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;