import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
router.use("/auth", authRoutes);

export default router;
