import { Router } from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", getProduct);
productsRouter.post("/", isValidProduct, createProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;
