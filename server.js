import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/MongoDb.js";
import ImportData from "./Dataimport.js";
import productRoute from "./Routes/ProductRoute.js";

const app = express();
connectDb();
dotenv.config();

app.use("/api/import", ImportData);
app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.json("API is running....");
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server runing.. port ${PORT}`));
