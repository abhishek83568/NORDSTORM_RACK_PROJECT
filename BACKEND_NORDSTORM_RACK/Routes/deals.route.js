const express = require("express");
const DealsModel = require("../Models/deals.model");

const dealsRouter = express.Router();

dealsRouter.post("/create-deals", async (req, res) => {
  try {
    const { title, price, category, image } = req.body;
    const product = new DealsModel({
      title,
      price,
      image,
      category,
    });

    await product.save();
    res.status(201).send("Deals added successfully");
  } catch (error) {
    res.status(404).json({ message: `Error while creating Deals ${error}` });
  }
});

dealsRouter.get("/get-deals", async (req, res) => {
  try {
    const product = await DealsModel.find();
    res.status(200).json({
      message: "Deals retrieved successfully",
      product,
    });
  } catch (error) {
    res.status(404).json({ message: `Error while retrieving Deals ${error}` });
  }
});

dealsRouter.get("/get-searchDeals", async (req, res) => {
  try {
    const { limit = 5, page = 1, query = "" } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skipNumber = (pageNumber - 1) * limitNumber;

    const searchCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const product = await DealsModel.find(searchCondition)
      .skip(skipNumber)
      .limit(limitNumber);

    const totalProducts = await DealsModel.countDocuments(searchCondition);

    res.status(200).json({
      message: "Deals retrieved successfully",
      product,
      totalProducts,
    });
  } catch (error) {
    res.status(404).json({ message: `Error while retrieving Deals ${error}` });
  }
});

module.exports = dealsRouter;
