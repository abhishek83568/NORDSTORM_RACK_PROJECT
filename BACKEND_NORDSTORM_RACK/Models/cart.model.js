const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity:{
     type:Number
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,ref:'user',
      required: true,
    },productId: {
      type: mongoose.Schema.Types.ObjectId,ref:'product',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
