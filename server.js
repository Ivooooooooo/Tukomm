import express from "express";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

try {
    const app = express();
    const port = process.env.PORT;

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: process.env.SESSION_RESAVE === 'true',
        saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
        cookie: {
            secure: process.env.SESSION_COOKIE_SECURE === 'true',
            maxAge: 1000 * 60 * 60 * 24
        }
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors());
    app.use("/public", express.static("public"));

    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", __dirname + "/src/views");

    app.use(router);

    app.use(pathHandler);
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (e) {
    console.log(e);
}