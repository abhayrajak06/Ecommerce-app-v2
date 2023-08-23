import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    if (!name) return res.status(500).send({ message: "Name is required" });
    if (!description)
      return res.status(500).send({ message: "Description is required" });
    if (!price) return res.status(500).send({ message: "Price is required" });
    if (!category)
      return res.status(500).send({ message: "Category is required" });
    if (!quantity)
      return res.status(500).send({ message: "Quantity is required" });
    if (photo && photo.size > 200000)
      return res
        .status(500)
        .send({ message: "Photo is required and  should be less than 2 mb" });

    // creating new product
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
    });
  }
};

// get all products
export const productController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Products list",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

//get single product
export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Get single product successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

//get product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product?.photo.data) {
      res.set("Content-type", product?.photo.contentType);
      return res.status(200).send(product?.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    if (!name) return res.status(500).send({ message: "Name is required" });
    if (!description)
      return res.status(500).send({ message: "Description is required" });
    if (!price) return res.status(500).send({ message: "Price is required" });
    if (!category)
      return res.status(500).send({ message: "Category is required" });
    if (!quantity)
      return res.status(500).send({ message: "Quantity is required" });
    if (photo && photo.size > 200000)
      return res
        .status(500)
        .send({ message: "Photo is required and  should be less than 2 mb" });

    // creating new product
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
    });
  }
};
