const mongoose=require('mongoose');

const dealSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

const DealsModel=mongoose.model('deals',dealSchema)

module.exports=DealsModel