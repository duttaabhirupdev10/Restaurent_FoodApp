const mongoose=require('mongoose');

//function mongodb database connection
 const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To Database ${mongoose.connection.host}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports=connectDb;
