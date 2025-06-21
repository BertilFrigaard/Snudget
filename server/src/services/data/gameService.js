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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../utils/database");
const logging_1 = require("../../utils/logging");
function getRedactedUsersInGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT id, username, profile_picture, created_at, last_login FROM users WHERE id IN (SELECT user_id FROM players WHERE game_id = $1)", [id]);
            return res.rows;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getRedactedUsersInGame = getRedactedUsersInGame;
function getRedactedGamesByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT id, owner_id, title, description, created_at, ends_at FROM games WHERE id IN (SELECT game_id FROM players WHERE user_id = $1)", [id]);
            return res.rows;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getRedactedGamesByUserId = getRedactedGamesByUserId;
function getRedactedGameById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT id, owner_id, title, description, created_at, ends_at FROM games WHERE id = $1", [id]);
            if (!res.rowCount) {
                return null;
            }
            if (res.rowCount > 1) {
                console.error("SELECT query returned multiple games. Returned null for safety");
                return null;
            }
            return res.rows[0];
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getRedactedGameById = getRedactedGameById;
function getGameById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT * FROM games WHERE id = $1", [id]);
            if (!res.rowCount) {
                return null;
            }
            if (res.rowCount > 1) {
                console.error("SELECT query returned multiple games. Returned null for safety");
                return null;
            }
            return res.rows[0];
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getGameById = getGameById;
function isGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT 1 FROM games WHERE id = $1", [id]);
            return res.rowCount === 1;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.isGame = isGame;
function isUserInGame(user_id, game_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT 1 FROM PLAYERS WHERE user_id = $1 AND game_id = $2", [user_id, game_id]);
            return res.rowCount === 1;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.isUserInGame = isUserInGame;
function createGame(title, description, owner_id, password_hash, ends_at) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("INSERT INTO games (title, description, owner_id, password_hash, ends_at) VALUES ($1, $2, $3, $4, $5) RETURNING id", [title, description, owner_id, password_hash, ends_at]);
            return res.rows[0].id;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.createGame = createGame;
function deleteGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("DELETE FROM games WHERE id = $1", [id]);
            return res.rowCount === 1;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.deleteGame = deleteGame;
function linkGameToUser(game_id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.pool.query("INSERT INTO players (game_id, user_id) VALUES ($1, $2)", [game_id, user_id]);
            return true;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.linkGameToUser = linkGameToUser;
