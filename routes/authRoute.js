import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routing
//register || post method
router.post("/register", registerController);

//login || post method
router.post("/login", loginController);

export default router;
