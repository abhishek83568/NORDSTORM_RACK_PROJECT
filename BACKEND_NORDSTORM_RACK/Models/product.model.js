const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
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
    },
    subCategory:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

const ProductModel=mongoose.model('product',productSchema)

module.exports=ProductModel