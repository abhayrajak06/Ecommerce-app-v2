import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//configure env
dotenv.config();

//config database
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce app</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on port ${process.env.PORT}`);
});
