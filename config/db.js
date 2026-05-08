const mongoose=require('mongoose');
const logger = require('../utils/logger');

//function mongodb database connection
 const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        logger.info(`Connected To Database ${mongoose.connection.host}`)
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`, { stack: error.stack });
        process.exit(1);
    }
};

module.exports=connectDb;
