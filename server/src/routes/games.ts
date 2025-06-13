import express from "express";
import authRoute from "../middleware/authRoute";
import { createGame, isUserInGame, linkGameToUser } from "../services/data/gameService";
import { hash } from "../utils/crypto";
import { createEntry } from "../services/data/entryService";

const router = express.Router();

router.post("/", authRoute, async (req, res) => {
    const user_id: string = req.session.user_id!;
    const title: string = req.body.title;
    const description: string | null = req.body.description;
    const password: string | null = req.body.password;
    const date: Date = new Date(req.body.date);

    const game_id = await createGame(title, description, user_id, password ? await hash(password) : null, date);
    linkGameToUser(game_id, user_id);
    res.status(201).json({ id: game_id });
});

router.post("/:id/entries", authRoute, async (req, res) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (!req.body.score_change) {
        res.sendStatus(400);
        return;
    }
    const score_change: number = req.body.score_change;
    if (await isUserInGame(user_id, game_id)) {
        createEntry(user_id, game_id, score_change);
        res.sendStatus(201);
    }
    res.status(403).json({ error: "Not allowed" });
});

export default router;
