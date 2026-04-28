const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const connectDb = require('./config/db');

//config env
dotenv.config();

//CB connectioin
connectDb();



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

app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Welcome to Express.js</h1>");
});

//listen
app.listen(PORT,()=>{
    console.log(`Node Server is running on http://localhost:${PORT}`);
});