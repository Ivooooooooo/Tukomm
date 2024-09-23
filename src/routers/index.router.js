import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter)
router.use("/", viewRouter)

export default router;