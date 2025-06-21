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
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (!users.rowCount) {
                return null;
            }
            if (users.rowCount > 1) {
                console.error("SELECT query returned multiple users. Returned null for safety");
                return null;
            }
            return users.rows[0];
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield database_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
            if (!users.rowCount) {
                return null;
            }
            if (users.rowCount > 1) {
                console.error("SELECT query returned multiple users. Returned null for safety");
                return null;
            }
            return users.rows[0];
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.getUserById = getUserById;
function insertUser(username, email, profile_picture, password_hash, verified) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield database_1.pool.query("INSERT INTO users (username, email, profile_picture, password_hash, verified) VALUES ($1, $2, $3, $4, $5) RETURNING id", [username, email, profile_picture, password_hash, verified]);
            if (res.rowCount !== 1) {
                console.error("Rowcount == " + res.rowCount);
                return null;
            }
            return res.rows[0].id;
        }
        catch (e) {
            logging_1.logError(e);
            return null;
        }
    });
}
exports.insertUser = insertUser;
function deleteUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.pool.query("DELETE FROM users WHERE id = $1", [user_id]);
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
        return true;
    });
}
exports.deleteUser = deleteUser;
function verifyUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.pool.query("UPDATE users SET verified = TRUE WHERE id = $1", [user_id]);
        }
        catch (e) {
            logging_1.logError(e);
            return false;
        }
        return true;
    });
}
exports.verifyUser = verifyUser;
