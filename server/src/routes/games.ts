import express from "express";
import authRoute from "../middleware/authRoute";
import { createGame, linkGameToUser } from "../services/data/gameService";
import { hash } from "../utils/crypto";

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

export default router;
