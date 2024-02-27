import Products from "../db/products";
import ApiError from "../error/ApiError";
const express = require('express');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const dosyaAdi = 'spesifik_isim' + path.extname(file.originalname);
    const dosyaYolu = path.join('public/uploads/', dosyaAdi);
    console.log("filename");
    cb(null, dosyaAdi);

    req.spesifikDosya = { dosyaAdi, dosyaYolu };
  },
});
const upload = multer({ storage });
export default (router) => {
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

  // upload image 
  router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      console.log(req.file);
      return res.status(400).json({ error: 'Dosya yüklenemedi.' });
    }
    if(res.status == 200){
      console.log("success");
    }
    console.log("worked");
  
    const uploadedFilePath = req.file.path;
    console.log('Dosya yüklendi ve kaydedildi:', uploadedFilePath);
  
    await res.json({ message: 'Dosya başarıyla yüklendi ve kaydedildi.' });
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
