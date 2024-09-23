import { Router } from "express";
import productsViewRouter from "./products.view.js";
import cartsViewRouter from "./carts.view.js";
import usersViewRouter from "./users.view.js";

const viewRouter = Router();

const routes = [
  { path: "/products", router: productsViewRouter },
  { path: "/carts", router: cartsViewRouter },
  { path: "/users", router: usersViewRouter },
];

routes.forEach(({ path, router }) => {
  viewRouter.use(path, router);
});

viewRouter.get("/", async (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    next(error);
  }
});

export default viewRouter;
