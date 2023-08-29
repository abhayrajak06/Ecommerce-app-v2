import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  productController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//create product route || POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product route || PUT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all products
router.get("/get-products", productController);

//get single product
router.get("/get-product/:slug", singleProductController);

//get product photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product
router.post("/product-filters", productFiltersController);

//count product
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search products
router.get("/search/:keyword", searchProductController);

export default router;
