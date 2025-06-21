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
function createEntry(user_id, game_id, score_change) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("INSERT INTO entries (user_id, game_id, score_change) VALUES ($1, $2, $3)", [
                user_id,
                game_id,
                score_change,
            ]);
            return true;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.createEntry = createEntry;
function getEntriesByGameId(game_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT * FROM entries WHERE game_id = $1", [game_id]);
            return res.rows;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getEntriesByGameId = getEntriesByGameId;
