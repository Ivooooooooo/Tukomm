import { Router } from "express";
import { 
    adminProducts,
    createViewProduct,
    deleteViewProduct,
    showEditProduct,
    showOneProduct,
    showAllProducts,
    updateViewProduct
} from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showAllProducts);
productsViewRouter.get("/admin", adminProducts); 

productsViewRouter.delete("/admin/:pid", deleteViewProduct);

productsViewRouter.get("/admin/create", (req, res) => { res.render("create"); });
productsViewRouter.post("/admin/create", createViewProduct);

productsViewRouter.get("/admin/edit/:pid", showEditProduct);
productsViewRouter.post("/admin/:pid", updateViewProduct);

productsViewRouter.get("/:pid", showOneProduct);

export default productsViewRouter;