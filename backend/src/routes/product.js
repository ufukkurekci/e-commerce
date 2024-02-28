import Products from "../db/products";
import ApiError from "../error/ApiError";
const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export default (router) => {

  // upload image
  router.post("/product/upload", upload.array("files"), async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Dosya yüklenemedi." });
    }
    console.log("worked");

    const uploadedFilesPaths = req.files.map(file => file.path);
    console.log("Dosyalar yüklendi ve kaydedildi:", uploadedFilesPaths);

    await res.json({ message: "Dosya başarıyla yüklendi ve kaydedildi." });
  });
  // create new product routes

  router.post("/product/add", async (req, res) => {
    try {
      console.log(req.body);
      const newProduct = new Products(req.body);

      await newProduct.save();

      res.status(201).json({
        message: "Product created",
        product: newProduct,
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(error, 400, "product creation error");
    }
  });


  // all read
  router.get("/product/getall", async (req, res) => {
    try {
      const products = await Products.find();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      throw new ApiError(error, 500, "product getall error");
    }
  });

  // get produts by id

  router.get("/product/get/:id", async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        throw new ApiError("Product not found", 404, "product not found");
      }
      res.status(200).json({
        product,
      });
    } catch (error) {
      throw new ApiError(error, 500, "product get error");
    }
  });

  router.delete("/product/delete/:id", async (req, res) => {
    const existproduct = await Products.findById(req.params.id);
    if (!existproduct) {
      throw new ApiError("Product not found", 404, "product not found");
    }
    await Products.deleteOne(existproduct);
    res.status(200).json({
      message: "Product deleted",
      product: existproduct,
    });
  });

  router.put("/product/update/:id", async (req, res) => {
    try {
      const existproduct = await Products.findById(req.params.id);
      const updates = req.body;
      if (!existproduct) {
        throw new ApiError("Product not found", 404, "product not found");
      }

      const updatedProduct = await Products.findByIdAndUpdate(
        existproduct.id,
        updates,
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Product updated",
        product: updatedProduct,
      });
    } catch (error) {
      throw new ApiError(error, 404);
    }
  });
};
