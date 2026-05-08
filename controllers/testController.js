const logger = require('../utils/logger');

const testUserController=(req,res)=>{
    try{
        logger.info('Test API called');
        res.status(200).send('<h1>Test User API</h1>');
    }catch(error){
        logger.error(`Error in test API: ${error.message}`, { stack: error.stack });
        res.status(500).send({
            success:false,
            message:"Error in test API"
        })
    }
};

module.exports={testUserController};