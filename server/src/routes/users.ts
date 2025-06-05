import express from "express";
import { getUserById } from "../utils/database";
import { isValidUUID } from "../utils/validation";
import { RedactedUser } from "../types/redactedUser";
import authRoute from "../middleware/authRoute";

const router = express.Router();

router.get("/me", authRoute, async (req, res) => {
    const user = await getUserById(req.session.user_id!);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        req.session.destroy(() => {});
        return;
    }
    const { password_hash, email, ...redactedUser } = user;
    res.send(redactedUser as RedactedUser);
});

router.get("/:id", authRoute, async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }
    if (!isValidUUID(req.params.id)) {
        res.status(400).json({ error: "Invalid UUID" });
        return;
    }
    const user = await getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    const { password_hash, email, ...redactedUser } = user;
    res.send(redactedUser as RedactedUser);
});

export default router;
