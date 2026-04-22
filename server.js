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
app.use('/api/v1/test',require('./routs/testRout'));
app.use('/api/v1/auth',require('./routs/authRoutes'));
app.use('/api/v1/user',require('./routs/userRoutes'));

app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Welcome to Express.js</h1>");
});

//listen
app.listen(PORT,()=>{
    console.log(`Node Server is running on http://localhost:${PORT}`);
});