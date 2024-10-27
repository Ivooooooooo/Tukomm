import { Router } from "express";
import productsApiRouter from "./products.api.js";
import usersApiRouter from "./users.api.js";
import cartsApiRouter from "./carts.api.js";

const apiRouter = Router()

apiRouter.use("/products", productsApiRouter)
apiRouter.use("/users", usersApiRouter)
apiRouter.use("/carts", cartsApiRouter)

export default apiRouter