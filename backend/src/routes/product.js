import Products from "../db/products";
import ApiError from "../error/ApiError";


export default (router) => {
  // create new product routes

  router.post("/product/add", async (req, res) => {
    try {
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
      res.status(200).json({
        products,
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(error, 500, "product getall error");
    }
  });

  // get produts by id

  router.get("/product/get/:id", async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if(!product){
        throw new ApiError("Product not found", 404, "product not found");
      }
      res.status(200).json({
        product,
      });
    } catch (error) {
      throw new ApiError(error, 500, "product get error");
    }
  });
};
