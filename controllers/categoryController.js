const categoryModel=require("../models/categoryModel");
const logger = require("../utils/logger");

//create category
const createCategoryController=async(req,res)=>{
    try {
        const {title,imageUrl}=req.body;
        logger.info(`Creating category: ${title}`);
        //validation
        if(!title){
            logger.warn('Category creation failed - Title is required');
            return res.status(400).send({
                success:false,
                message:"Category title is required"
            });
        }
        //create category
        const newCategory=new categoryModel({title,imageUrl});
        await newCategory.save();
        logger.info(`Category created successfully: ${title}`);
        res.status(201).send({
            success:true,
            message:"Category created successfully",
            newCategory
        });
    }
    catch(error){
        logger.error(`Error creating category: ${error.message}`, { title: req.body?.title, stack: error.stack });
        res.status(500).send({
            success:false,
            message:"Error in creating category",
            error
        });
    }
};

//GET ALL CATEGORY
const getAllCategoryController=async(req,res)=>{
    try {
        logger.info('Fetching all categories');
        const categories=await categoryModel.find({});
        if(!categories){
            logger.warn('No categories found');
            return res.status(404).send({
                success:false,
                message:"No categories found"
            });
        }
        logger.info(`Retrieved ${categories.length} categories`);
        res.status(200).send({
            success:true,
            message:"Categories fetched successfully",
            categories
        });
    }
    catch(error){
        logger.error(`Error fetching categories: ${error.message}`, { stack: error.stack });
        res.status(500).send({
            success:false,
            message:"Error in fetching categories",
            error
        });
    }
};

// UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    logger.info(`Updating category with ID: ${id}`);
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      logger.warn(`Category not found for update - ID: ${id}`);
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    logger.info(`Category updated successfully - ID: ${id}`);
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    logger.error(`Error updating category: ${error.message}`, { categoryId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "error in update category API",
      error,
    });
  }
};

// DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Delete request for category ID: ${id}`);
    if (!id) {
      logger.warn('Category ID is required for deletion');
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      logger.warn(`Category not found for deletion - ID: ${id}`);
      return res.status(500).send({
        success: false,
        message: "No Category Found With this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    logger.info(`Category deleted successfully - ID: ${id}`);
    res.status(200).send({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    logger.error(`Error deleting category: ${error.message}`, { categoryId: req.params?.id, stack: error.stack });
    res.status(500).send({
      success: false,
      message: "error in Dlete Cat APi",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController
}