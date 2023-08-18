import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//register || post method
router.post("/register", registerController);

//login || post method
router.post("/login", loginController);

//protected auth routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
