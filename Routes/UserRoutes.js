import asyncHandler from "express-async-handler";
import express from "express";
import User from "../Model/UserModel.js";

const userRoutes = express.Router();
// login
userRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// register
userRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const userExits = await User.findOne({ email });
    const phoneExits = await User.findOne({ phone });
    if (userExits && phoneExits) {
      res.status(400);
      throw new Error("Số điện thoại và email bị trùng lặp");
    }
    if (userExits) {
      res.status(400);
      throw new Error("Email bị trùng lặp");
    }
    if (phoneExits) {
      res.status(400);
      throw new Error("Số điện thoại bị trùng lặp");
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// profile
userRoutes.get(
  "/profile/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRoutes;
