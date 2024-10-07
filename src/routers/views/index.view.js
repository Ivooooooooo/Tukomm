import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";

const viewRouter = Router();

viewRouter.get("/", (res, next)=> {
    try {
        return res.redirect("/products");
    } catch (error) {
        return next(error);
    }
});

viewRouter.use("/products", productsViewRouter);
viewRouter.use("/users", usersViewRouter);

export default viewRouter;