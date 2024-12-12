const express = require("express");
const razorpay = require("razorpay");
const dotenv = require("dotenv").config();
const crypto = require("crypto");
const PaymentModel = require("../Models/payment.model");

const paymentRouter = express.Router();

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

//Route 1 : Creating order api using POST method

paymentRouter.post("/order", (req, res) => {
  const { amount } = req.body;
  try {
    
    const options = {
      amount: Number(amount*100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
      console.log(order);
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
  }
});

//Route 2: Create verify api using post method
paymentRouter.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log("req.body", req.body);
  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log(razorpay_signature === expectedSign);
    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new PaymentModel({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await payment.save();
      res.json({
        message: "Payment Successfully done",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = paymentRouter;
