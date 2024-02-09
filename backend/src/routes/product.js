import Products from "../db/products";
import ApiError from "../error/ApiError";
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    files: 8, // Maximum number of files
    fileSize: 1024 * 1024 * 25, // Maximum file size (5 MB in this example)
  }
});
export default (router) => {
  // create new product routes

  router. post("/product/add", upload.array("images"), async (req, res) => {
    try {
      const images = req.files.map((file) => ({
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      }));

      const newProduct = new Products({
        name: req.body.name,
        images: images,
        description: req.body.description,
        price:{
          basePrice: req.body.basePrice,
          discountPrice: req.body.discountPrice
        },
        stock: req.body.stock,
      });

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
