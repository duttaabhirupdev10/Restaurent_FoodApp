const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const connectDb = require('./config/db');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');

//config env
dotenv.config();

//CB connectioin
connectDb();
logger.info('Database connection initiated');

//rest object
const app=express();

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//port
const PORT=process.env.PORT || 8080;

//rout
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes'));
app.use('/api/v1/category',require('./routes/categoryRoutes'));
app.use('/api/v1/food',require('./routes/foodRoutes'));

app.get("/",(req,res)=>{
    logger.info('Home route accessed');
    return res.status(200).send("<h1>Welcome to Express.js</h1>");
});

// Error handling middleware
app.use(errorHandler);

//listen
app.listen(PORT,()=>{
    logger.info(`Node Server is running on http://localhost:${PORT}`);
});