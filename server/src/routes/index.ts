import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
import userRoutes from "./users";

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
