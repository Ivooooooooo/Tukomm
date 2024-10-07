import { Router } from "express";
import { 
    createProduct, 
    destroyProduct,
    getAllProducts,
    getProduct,
    updateProduct 
} from "../../controllers/products.controller.js";
import { 
    validateNewProduct,
    validateProductModification 
} from "../../middlewares/isValidData.mid.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", getProduct);
productsRouter.post("/", validateNewProduct, createProduct);
productsRouter.put("/:pid", validateProductModification, updateProduct);
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;