const express = require("express");
const CartModel = require("../Models/cart.model");
const Auth = require("../Middlewares/Auth.middleware");

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", Auth, async (req, res) => {
  try {
    const { title, image, price, category, productId } = req.body;
    const userId = req.user._id;

    const product = new CartModel({
      title,
      image,
      price,
      category,
      userId,
      quantity: 1,
      productId,
    });

    await product.save();
    res.status(201).json({
      message: "Product added to cart",
      product,
    });
  } catch (error) {
    res.status(404).send(`Error while adding to cart ${error}`);
  }
});

cartRouter.get("/user-cartData", Auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cartData = await CartModel.find({ userId });
    res.status(200).json({
      message: "User cartData retrieved successfully",
      cartData,
    });
  } catch (error) {
    res.status(404).send(`Error while retrieving user Cartdata ${error}`);
  }
});

cartRouter.patch("/update-cartProduct/:id", Auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    const payload = req.body;

    const product = await CartModel.findOne({ productId, userId });
    if (!product) {
      return res.status(404).send(`Product not found`);
    }

    if (product.userId.toString() === userId.toString()) {
      const updatedProduct = await CartModel.findByIdAndUpdate(
        product._id,
        payload
      );

      res.status(202).json({
        message: "Cartdata Updated successfully",
        updatedProduct,
      });
    }
  } catch (error) {
    res.status(404).send(`Error while updating cartProduct ${error}`);
  }
});

cartRouter.delete("/delete-cartProduct/:id", Auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    console.log(productId);
    console.log(userId);

    const product = await CartModel.findOne({ productId, userId });
    console.log(product);
    if (!product) {
      return res.status(404).send(`Product not found`);
    }

    if (product.userId.toString() === userId.toString()) {
      const deletedProduct = await CartModel.findByIdAndDelete(product._id);
      res.status(202).json({
        message: "Cartdata deleted successfully",
        deletedProduct,
      });
    } else {
      res.status(403).send("Unauthorized to delete this product.");
    }
  } catch (error) {
    res.status(404).send(`Error while deleting cartProduct ${error}`);
  }
});

module.exports = cartRouter;
