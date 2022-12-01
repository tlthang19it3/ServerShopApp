import express from "express";
import products from "./data/Products.js";
import users from "./data/users.js";
import Product from "./Model/ProductModel.js";
import User from "./Model/UserModel.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/product",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProduct = await Product.insertMany(products);
    res.send({ importProduct });
  })
);

export default ImportData;
