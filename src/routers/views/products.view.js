import { Router } from "express";
import { 
    showOneProduct,
    showAllProducts,
} from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showAllProducts);

productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;