import asyncHandler from "express-async-handler";
import express from "express";
import Clothe from "../Model/ClothesModel.js";

const productRoute = express.Router();
// get all product
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const clothes = await Clothe.find({});
    res.json(clothes);
  })
);
//get single product
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const clothes = await Clothe.findById(req.params.id);
    if (clothes) {
      res.json(clothes);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default productRoute;
