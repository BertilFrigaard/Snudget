import express, { Request, Response, Router } from "express";
import { authRoute } from "../middleware/authRoute";
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
import uuidParamRoute from "../middleware/uuidParamRoute";
import { logError } from "../utils/logging";
const router: Router = express.Router();

router.post("/", authRoute, async (req: Request, res: Response) => {
    const user_id: string = req.session.user_id!;
    if (typeof req.body.title !== "string" || typeof req.body.date !== "string") {
        res.sendStatus(400);
        return;
    }
    const title: string = req.body.title;
    const description: string | null = req.body.description;
    const password: string | null = req.body.password;
    const date: Date = new Date(req.body.date);
    if (isNaN(date.getTime())) {
        res.sendStatus(400);
        return;
    }
    try {
        const game_id = await createGame(title, description, user_id, password ? await hash(password) : null, date);
        if (game_id) {
            await linkGameToUser(game_id, user_id);
            res.status(201).json({ id: game_id });
        } else {
            res.status(500).json({ error: "Failed to create game" });
        }
    } catch (e: unknown) {
        logError(e);
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete("/:id", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
    const game = await getRedactedGameById(req.params.id);
    if (!game) {
        res.status(404).json({ error: "Game not found" });
        return;
    }
    if (game.owner_id == req.session.user_id) {
        if (await deleteGame(game.id)) {
            res.sendStatus(200);
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        res.status(403).json({ error: "Not allowed" });
    }
});

router.post("/:id/entries", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (!req.body.score_change) {
        res.sendStatus(400);
        return;
    }
    const score_change: number = Number(req.body.score_change);
    if (Number.isNaN(score_change)) {
        res.status(400).json({ error: "Invalid number score_change" });
        return;
    }
    if (await isUserInGame(user_id, game_id)) {
        const success = await createEntry(user_id, game_id, score_change);
        if (success) {
            res.sendStatus(201);
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
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

router.get("/:id/entries", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (await isUserInGame(user_id, game_id)) {
        const entries = await getEntriesByGameId(game_id);
        if (entries === null) {
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.json(entries);
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id/players", authRoute, uuidParamRoute, async (req: Request, res: Response) => {
    const user_id: string = req.session.user_id!;
    const game_id: string = req.params.id;
    if (await isUserInGame(user_id, game_id)) {
        const users = await getRedactedUsersInGame(game_id);
        if (users === null) {
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.json(users);
        return;
    }
    res.status(403).json({ error: "Not allowed" });
});

router.get("/:id/join", uuidParamRoute, async (req: Request, res: Response) => {
    if (!process.env.FRONTEND_URL) {
        throw new Error("URL enviroment variables not set");
    }
    const game_id: string = req.params.id;
    if (!req.session.user_id) {
        req.session.redirect = req.originalUrl;
        res.redirect(process.env.FRONTEND_URL + "/login");
        return;
    }
    if (await isGame(game_id)) {
        if (!(await isUserInGame(req.session.user_id, game_id))) {
            if (await linkGameToUser(game_id, req.session.user_id)) {
                res.redirect(process.env.FRONTEND_URL + "/games/view/" + game_id);
                return;
            } else {
                res.redirect(process.env.FRONTEND_ERROR_URL + "Something went wrong");
            }
        } else {
            res.redirect(process.env.FRONTEND_ERROR_URL + "You are already participating in this game");
        }
    } else {
        res.redirect(
            process.env.FRONTEND_ERROR_URL + "Game not found. Please request a new invite link from a participant."
        );
    }
});

export default router;
