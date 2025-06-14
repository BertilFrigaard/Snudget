import { Router } from "express";

import authRoutes from "./auth";
import userRoutes from "./users";
import gameRoutes from "./games";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/games", gameRoutes);

export default router;
