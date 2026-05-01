const mongoose=require('mongoose');

//schema
const orderSchema=new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
    }],
    payment:{
        type:Number,
        required:[true,"payment amount is required"],
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipped","Delivered","Cancel"],
    },
},
{timestamps:true});

const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;