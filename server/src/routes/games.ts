import express, { Router } from "express";
import authRoute from "../middleware/authRoute";
import {
    createGame,
    deleteGame,
    getRedactedGameById,
    getRedactedUsersInGame,
    isGame,
    isUserInGame,
    linkGameToUser,
} from "../services/data/gameService";
import { hash } from "../utils/crypto";
import { createEntry, getEntriesByGameId } from "../services/data/entryService";

const router: Router = express.Router();

router.post("/", authRoute, async (req, res) => {
    const user_id: string = req.session.user_id!;
    const title: string = req.body.title;
    const description: string | null = req.body.description;
    const password: string | null = req.body.password;
    const date: Date = new Date(req.body.date);

    const game_id = await createGame(title, description, user_id, password ? await hash(password) : null, date);
    await linkGameToUser(game_id, user_id);
    res.status(201).json({ id: game_id });
});

router.delete("/:id", authRoute, async (req, res) => {
    const game = await getRedactedGameById(req.params.id);
    if (!game) {
        res.status(404).json({ error: "Game not found" });
        return;
    }
    if (game.owner_id == req.session.user_id) {
        deleteGame(game.id);
        res.sendStatus(200);
    } else {
        res.status(403).json({ error: "Not allowed" });
    }
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
        await createEntry(user_id, game_id, score_change);
        res.sendStatus(201);
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id", authRoute, async (req, res) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (await isUserInGame(user_id, game_id)) {
        const game = await getRedactedGameById(game_id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ error: "Game not found" });
        }
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id/entries", authRoute, async (req, res) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (await isUserInGame(user_id, game_id)) {
        res.json(await getEntriesByGameId(game_id));
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id/players", authRoute, async (req, res) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (await isUserInGame(user_id, game_id)) {
        res.json(await getRedactedUsersInGame(game_id));
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id/join", async (req, res) => {
    const game_id: string = req.params.id;
    if (!req.session.user_id) {
        req.session.redirect = req.originalUrl;
        res.redirect(process.env.FRONTEND_URL + "/login");
        return;
    }
    if (await isGame(game_id)) {
        if (!(await isUserInGame(req.session.user_id, game_id))) {
            await linkGameToUser(game_id, req.session.user_id);
        }
        res.redirect(process.env.FRONTEND_URL + "/games/view/" + game_id);
        return;
    } else {
        res.status(404).json({ error: "Game not found" });
        return;
    }
});

export default router;
