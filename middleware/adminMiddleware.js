const userModel = require("../models/userModel");
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin") {
      logger.warn(`Unauthorized admin access attempt by user ID: ${req.body.id}`);
      return res.status(401).send({
        success: false,
        message: "Only Admin ACess ",
      });
    } else {
      logger.info(`Admin access granted for user ID: ${req.body.id}`);
      next();
    }
  } catch (error) {
    logger.error(`Admin middleware error: ${error.message}`, { stack: error.stack });
    res.status(500).send({
      success: false,
      message: "Un-AUthorized ACCESS",
      error,
    });
  }
};