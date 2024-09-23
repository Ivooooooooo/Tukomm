import express from "express";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

const startServer = async () => {
  try {
    const server = express();
    const port = process.env.PORT || 8000; // agregar key al .env

    server.use(morgan("dev"));
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());

    server.use("/public", express.static(__dirname + "/public"));

    server.engine("handlebars", engine());
    server.set("view engine", "handlebars");
    server.set("views", __dirname + "/src/views");

    server.use(router);

    server.use(errorHandler);
    server.use(pathHandler);

    server.listen(port, () => {
      console.log(`Server ready on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();