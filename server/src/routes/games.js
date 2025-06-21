"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("../middleware/authRoute");
const gameService_1 = require("../services/data/gameService");
const crypto_1 = require("../utils/crypto");
const entryService_1 = require("../services/data/entryService");
const uuidParamRoute_1 = __importDefault(require("../middleware/uuidParamRoute"));
const logging_1 = require("../utils/logging");
const router = express_1.default.Router();
router.post("/", authRoute_1.authRoute, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.user_id;
    if (typeof req.body.title !== "string" || typeof req.body.date !== "string") {
        res.sendStatus(400);
        return;
    }
    const title = req.body.title;
    const description = req.body.description;
    // TODO remove password functionality completely
    const password = req.body.password;
    // TODO Verify date start and end
    // TODO somewhere make sure games end and that entries can't be made after the end date
    const date = new Date(req.body.date);
    if (isNaN(date.getTime())) {
        res.sendStatus(400);
        return;
    }
    try {
        const game_id = yield gameService_1.createGame(title, description, user_id, password ? yield crypto_1.hash(password) : null, date);
        if (game_id) {
            yield gameService_1.linkGameToUser(game_id, user_id);
            res.status(201).json({ id: game_id });
        }
        else {
            res.status(500).json({ error: "Failed to create game" });
        }
    }
    catch (e) {
        logging_1.logError(e);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
router.delete("/:id", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield gameService_1.getRedactedGameById(req.params.id);
    if (!game) {
        res.status(404).json({ error: "Game not found" });
        return;
    }
    if (game.owner_id == req.session.user_id) {
        if (yield gameService_1.deleteGame(game.id)) {
            res.sendStatus(200);
        }
        else {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
    else {
        res.status(403).json({ error: "Not allowed" });
    }
}));
router.post("/:id/entries", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.user_id;
    const game_id = req.params.id;
    if (!req.body.score_change) {
        res.sendStatus(400);
        return;
    }
    const score_change = Number(req.body.score_change);
    if (Number.isNaN(score_change)) {
        res.status(400).json({ error: "Invalid number score_change" });
        return;
    }
    if (yield gameService_1.isUserInGame(user_id, game_id)) {
        const success = yield entryService_1.createEntry(user_id, game_id, score_change);
        if (success) {
            res.sendStatus(201);
        }
        else {
            res.status(500).json({ error: "Something went wrong" });
        }
        return;
    }
    res.status(403).json({ error: "Not allowed" });
}));
router.get("/:id", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.user_id;
    const game_id = req.params.id;
    if (yield gameService_1.isUserInGame(user_id, game_id)) {
        const game = yield gameService_1.getRedactedGameById(game_id);
        if (game) {
            res.json(game);
        }
        else {
            res.status(404).json({ error: "Game not found" });
        }
        return;
    }
    res.status(403).json({ error: "Not allowed" });
}));
router.get("/:id/entries", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.user_id;
    const game_id = req.params.id;
    if (yield gameService_1.isUserInGame(user_id, game_id)) {
        const entries = yield entryService_1.getEntriesByGameId(game_id);
        if (entries === null) {
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.json(entries);
        return;
    }
    res.status(403).json({ error: "Not allowed" });
}));
router.get("/:id/players", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.user_id;
    const game_id = req.params.id;
    if (yield gameService_1.isUserInGame(user_id, game_id)) {
        const users = yield gameService_1.getRedactedUsersInGame(game_id);
        if (users === null) {
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.json(users);
        return;
    }
    res.status(403).json({ error: "Not allowed" });
}));
router.get("/:id/join", uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.FRONTEND_URL) {
        throw new Error("URL enviroment variables not set");
    }
    const game_id = req.params.id;
    if (!req.session.user_id) {
        req.session.redirect = req.originalUrl;
        res.redirect(process.env.FRONTEND_URL + "/login");
        return;
    }
    if (yield gameService_1.isGame(game_id)) {
        if (!(yield gameService_1.isUserInGame(req.session.user_id, game_id))) {
            if (yield gameService_1.linkGameToUser(game_id, req.session.user_id)) {
                res.redirect(process.env.FRONTEND_URL + "/games/view/" + game_id);
                return;
            }
            else {
                res.redirect(process.env.FRONTEND_ERROR_URL + "Something went wrong");
            }
        }
        else {
            res.redirect(process.env.FRONTEND_ERROR_URL + "You are already participating in this game");
        }
    }
    else {
        res.redirect(process.env.FRONTEND_ERROR_URL + "Game not found. Please request a new invite link from a participant.");
    }
}));
exports.default = router;
