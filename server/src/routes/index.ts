import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
import userRoutes from "./users";
import gameRoutes from "./games";

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/games", gameRoutes);

export default router;
