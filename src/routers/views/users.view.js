import { Router } from "express";
import { authenticateUser, createViewUser } from "../../controllers/users.controller.js";

const usersViewRouter = Router();

usersViewRouter.get("/login", (req, res) => {
    res.render("login");
});

usersViewRouter.post("/login", authenticateUser);

usersViewRouter.get("/register", (req, res) => {
    res.render("register");
});

usersViewRouter.post("/register", createViewUser);

usersViewRouter.get("/profile", (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/users/login");
    }

    const userData = req.session.userData;
    console.log("Profile photo URL: ", userData.photo); 
    return res.render("profile", { user: userData });
});

export default usersViewRouter;