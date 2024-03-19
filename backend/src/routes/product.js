import Products from "../db/products";
import ApiError from "../error/ApiError";
const multer = require("multer");

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
  router.post("/product/add", upload.array("files"), async (req, res) => {
    try {
      // console.log(req.body);

      // console.log(req.body.product);

      const productData = JSON.parse(req.body.product);

      const pathUrls = req.files.map((file) => ({ pathUrl: file.path }));

      // Eksik olan pathUrl'leri doldur
      productData.images.forEach((image, index) => {
        if (!image.pathUrl) {
          productData.images[index].pathUrl = pathUrls.shift().pathUrl;
        }
      });

      // Yeni bir Products nesnesi oluştur ve kaydet
      const newProduct = new Products(productData);

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
      const imagesUrls = product.images.map((image) => ({
        imageName: image.imageName,
        pathUrl: image.pathUrl,
        type: image.type,
      }));

      res.status(200).json({
        ...product._doc,
        images: imagesUrls,
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

  router.post("/product/update/:id",upload.array("files"),async (req, res) => {
      try {
        const existproduct = await Products.findById(req.params.id);
        if (!existproduct) {
          throw new ApiError("Product not found", 404, "product not found");
        }
        const updates = JSON.parse(req.body.product);
        if (req.files > 0) {
          const pathUrls = req.files.map((file) => ({ pathUrl: file.path }));

          updates.images.forEach((image, index) => {
            if (!image.pathUrl) {
              updates.images[index].pathUrl = pathUrls.shift().pathUrl;
            }
          });
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
    }
  );

  router.post("/product/addReview/:id", async (req, res) => {
    try {
      const existproduct = await Products.findById(req.params.id);
      if (!existproduct) {
        throw new ApiError("Product not found");
      }
      console.log(req.body);
      console.log(req.body.reviews);
      if (req.body.reviews != undefined) {
        const newReview = {
          text: req.body.reviews.text,
          rating: req.body.reviews.rating,
          user: req.body.reviews.user,
        };
        existproduct.reviews.push(newReview);

        const updatedProduct = await existproduct.save();

        res.status(200).json({
          message: "Review added",
          product: updatedProduct,
        });
      }
    } catch (error) {
      throw new ApiError(error, 404);
    }
  });
};
