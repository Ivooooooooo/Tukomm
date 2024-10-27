import { Router } from "express";
import { create, destroy, read, paginate, readAll, update } from "../../controllers/products.controller.js";

const productsApiRouter = Router();

productsApiRouter.post("/", create);
productsApiRouter.get("/", readAll);
productsApiRouter.get("/paginate", paginate);
productsApiRouter.get("/:pid", read);
productsApiRouter.put("/:pid", update);
productsApiRouter.delete("/:pid", destroy);

export default productsApiRouter;