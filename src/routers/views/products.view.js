import { Router } from "express";
import { showProducts, showOneProduct } from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.route("/").get(showProducts);
productsViewRouter.route("/:pid").get(showOneProduct);

export default productsViewRouter;