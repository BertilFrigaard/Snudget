import express from "express";
import { getUserById } from "../services/data/userService";
import { isValidUUID } from "../utils/validation";
import { RedactedUser } from "../types/redactedUser";
import authRoute from "../middleware/authRoute";
import { getRedactedGamesByUserId } from "../services/data/gameService";

const router = express.Router();

router.get("/me", authRoute, async (req, res) => {
    const user = await getUserById(req.session.user_id!);
    if (!user) {
        req.session.destroy(() => {});
        res.status(404).json({ error: "User not found" });
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

router.get("/:id/games", authRoute, async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }
    if (!isValidUUID(req.params.id)) {
        res.status(400).json({ error: "Invalid UUID" });
        return;
    }
    if (req.params.id !== req.session.user_id) {
        res.status(403).json({ error: "Missing permission" });
        return;
    }
    const games = await getRedactedGamesByUserId(req.params.id);
    res.json(games);
    return;
});

export default router;
