const testUserController=(req,res)=>{
    try{
        res.status(200).send('<h1>Test User API</h1>');
    }catch(error){
        console.log("error in test API",error)
        res.status(500).send({
            success:false,
            message:"Error in test API"
        })
    }
};

module.exports={testUserController};