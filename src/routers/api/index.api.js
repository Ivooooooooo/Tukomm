import { Router } from "express";
import productsRouter from "./products.api.js";
import usersApiRouter from "./users.api.js";
import cartsApiRouter from "./carts.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsApiRouter);
apiRouter.use("/users", usersApiRouter);

export default apiRouter;