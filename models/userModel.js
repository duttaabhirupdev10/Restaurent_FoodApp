const mongoose=require('mongoose');

//schema
const userSchema=new mongoose.Schema({
    userName: {
    type:String,
    required :[true,'username is required']
},email:{
    type:String,
    required:[true,'email is required'],
    unique:true
},password:{
    type: String,
    required:[true,'password is required']
},address:{
    type: Array,
},phone:{
    type: String,
    required:[true,'phone number is required']
},usertype:{
    type:String,
    required:[true,'usertype is required'],
    default:'client',
    enum:['client','admin','vendor','driver']
},profile:{
    type:String,
    default:'https://res.cloudinary.com/dzcmadjlq/image/upload/v1702054417/default-profile-picture-1_oyh5l8.png'
},
answer:{
    type:String,
    required:[true,'answer is required']
}
},{timestamps:true})

//export
module.exports = mongoose.model('User',userSchema);