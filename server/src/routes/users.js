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
const userService_1 = require("../services/data/userService");
const authRoute_1 = require("../middleware/authRoute");
const gameService_1 = require("../services/data/gameService");
const uuidParamRoute_1 = __importDefault(require("../middleware/uuidParamRoute"));
const redaction_1 = require("../utils/redaction");
const router = express_1.default.Router();
router.get("/me", authRoute_1.authRoute, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService_1.getUserById(req.session.user_id);
    if (!user) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Failed to destroy session: " + err);
            }
        });
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(redaction_1.redactUser(user));
}));
router.get("/:id", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService_1.getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(redaction_1.redactUser(user));
}));
router.get("/:id/games", authRoute_1.authRoute, uuidParamRoute_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id !== req.session.user_id) {
        res.status(403).json({ error: "Missing permission" });
        return;
    }
    const games = yield gameService_1.getRedactedGamesByUserId(req.params.id);
    if (games === null) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }
    res.json(games);
}));
exports.default = router;
