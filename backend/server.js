import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows use to accept json data in req.body (middleware)

app.use("/api/products", productRoutes);

app.listen(5001, () => {
  connectDB();
  console.log("server started at port 5001 nation");
});
