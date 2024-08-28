const express = require("express");
const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    bcrypt.hash(password, 5, async function (err, hash) {
      if (hash) {
        const newUser = new UserModel({
          firstname,
          lastname,
          email,
          password: hash,
        });

        await newUser.save();
        res
          .status(201)
          .json({ message: "User registered successfully" });
      } else {
        res.status(403).send(`Error while hashing ${err}`);
      }
    });
  } catch (error) {
    res.status(404).json({ message: `Error while registering ${error}` });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Wrong Email or User not found" });
    }

    bcrypt.compare(password, existingUser.password, function (err, result) {
      
      if (result) {
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );

        res.status(200).json({
          message: `User login Successfully`,
          token,
        });
      }
      else{
        return res
        .status(500)
        .send(`Error while comparing passwords: ${err}`);
      }
    });
  } catch (error) {
    res.status(201).json({
      message: `Error while loggingIn ${error}`,
    });
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    res.send("Logout Route");
  } catch (error) {}
});

module.exports = userRouter;
