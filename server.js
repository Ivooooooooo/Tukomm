import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import socketCb from "./src/routers/index.socket.js";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import session from "express-session";
import dbConnect from "./src/utils/db.util.js";

const app = express();
const port = process.env.PORT || 8080;

const initializeServer = async () => {
    try {
        await dbConnect();

        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: process.env.SESSION_RESAVE === 'true',
            saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
            cookie: {
                secure: process.env.SESSION_COOKIE_SECURE === 'true',
                maxAge: 1000 * 60 * 60 * 24,
            }
        }));

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(morgan("dev"));
        app.use(cors());
        app.use("/public", express.static(__dirname + "/public"));

        app.engine("handlebars", engine());
        app.set("view engine", "handlebars");
        app.set("views", __dirname + "/src/views");

        app.use(router);
        app.use(pathHandler);
        app.use(errorHandler);

        const httpServer = createServer(app);
        const socketServer = new Server(httpServer);

        socketServer.on("connection", socketCb);

        httpServer.listen(port, () => {
            console.log(`Server ready on port: ${port}`);
        });

        return socketServer;
    } catch (error) {
        console.error("Error while starting the server:", error);
    }
};

const socketServer = await initializeServer();
export { socketServer };
