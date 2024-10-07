import { Router } from "express";
import apiRouter from "../routers/api/index.api.js"
import viewRouter from "../routers/views/index.view.js";

const router = Router();

router.use("/", viewRouter);
router.use("/api", apiRouter);

export default router;