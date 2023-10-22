import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();

//config database
connectDB();

//rest object
const app = express();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/category", categoryRoutes);
app.use("/api/v2/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on port ${process.env.PORT}`);
});
