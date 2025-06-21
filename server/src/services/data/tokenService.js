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
function insertToken(token_hash, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("INSERT INTO email_verification_tokens (token_hash, user_id) VALUES ($1, $2)", [
                token_hash,
                user_id,
            ]);
            return true;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.insertToken = insertToken;
function deleteToken(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("DELETE FROM email_verification_tokens WHERE user_id = $1", [user_id]);
            return true;
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
    });
}
exports.deleteToken = deleteToken;
function getTokenHashByUserId(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("SELECT token_hash FROM email_verification_tokens WHERE user_id = $1", [user_id]);
            if (res.rowCount === 1) {
                return res.rows[0].token_hash;
            }
            return null;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getTokenHashByUserId = getTokenHashByUserId;
