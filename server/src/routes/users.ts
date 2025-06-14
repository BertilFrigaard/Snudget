import express, { Request, Response } from "express";
import { getUserById } from "../services/data/userService";
import { RedactedUser } from "../types/redactedUser";
import { authRoute } from "../middleware/authRoute";
import { getRedactedGamesByUserId } from "../services/data/gameService";
import uuidParamRoute from "../middleware/uuidParamRoute";
import { redactUser } from "../utils/redaction";

const router = express.Router();

router.get("/me", authRoute, async (req: Request, res: Response) => {
    const user = await getUserById(req.session.user_id!);
    if (!user) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Failed to destroy session: " + err);
            }
        });
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(redactUser(user));
});

router.get("/:id", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(redactUser(user));
});

router.get("/:id/games", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
    if (req.params.id !== req.session.user_id) {
        res.status(403).json({ error: "Missing permission" });
        return;
    }
    const games = await getRedactedGamesByUserId(req.params.id);
    if (games === null) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }
    res.json(games);
});

export default router;
