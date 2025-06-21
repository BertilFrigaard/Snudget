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
const googleAuth_1 = require("../services/auth/googleAuth");
const userService_1 = require("../services/data/userService");
const authRoute_1 = require("../middleware/authRoute");
const logging_1 = require("../utils/logging");
const bcrypt_1 = require("bcrypt");
const crypto_1 = require("../utils/crypto");
const emailService_1 = require("../services/external/emailService");
const tokenService_1 = require("../services/data/tokenService");
const router = express_1.default.Router();
router.post("/logout", authRoute_1.authRoute, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: "Session could not be destroyed" });
        }
        else {
            res.clearCookie("session");
            res.sendStatus(200);
        }
    });
});
router.get("/status", (req, res) => {
    res.json({ logged_in: req.session.user_id != null });
});
router.get("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.token || !req.query.user_id) {
        res.status(400).json({ error: "Missing query" });
        return;
    }
    const tokenHash = yield tokenService_1.getTokenHashByUserId(req.query.user_id);
    if (!tokenHash) {
        res.status(403).json({ error: "Wrong user id or token" });
        return;
    }
    if (!(yield bcrypt_1.compare(req.query.token, tokenHash))) {
        res.status(403).json({ error: "Wrong user id or token" });
        return;
    }
    if (!userService_1.verifyUser(req.query.user_id)) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }
    tokenService_1.deleteToken(req.query.user_id);
    res.redirect(process.env.FRONTEND_LOGIN_SUCCESS_URL + "/login");
}));
// NORMAL AUTH    NORMAL AUTH    NORMAL AUTH
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user_id) {
        res.status(403).json({ error: "You are already logged in" });
        return;
    }
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ error: "Wrong body format" });
        return;
    }
    const username = req.body.username;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = yield userService_1.getUserByEmail(email);
    if (user) {
        if (user.verified) {
            res.status(200).json({ error: "Check your email for further instructions" });
            return;
        }
        if (!(yield userService_1.deleteUser(user.id))) {
            res.status(500).json({ error: "Server error" });
            return;
        }
    }
    const user_id = yield userService_1.insertUser(username, email, null, yield crypto_1.hash(password), false);
    if (user_id) {
        const token = crypto_1.generateToken();
        const tokenHash = yield crypto_1.hash(token);
        if (!(yield tokenService_1.insertToken(tokenHash, user_id))) {
            res.status(500).json({ error: "Something went wrong" });
            yield userService_1.deleteUser(user_id);
            return;
        }
        if (!(yield emailService_1.sendVerifyLink(token, user_id, req.body.email))) {
            yield tokenService_1.deleteToken(user_id);
            yield userService_1.deleteUser(user_id);
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.status(200).json({ error: "Check your email for further instructions" });
        return;
    }
    res.status(500).json({ error: "Something went wrong" });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user_id) {
        res.status(403).json({ error: "You are already logged in" });
        return;
    }
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Wrong body format" });
        return;
    }
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    const user = yield userService_1.getUserByEmail(email);
    if (!user) {
        res.status(401).json({ error: "Wrong email or password" });
        return;
    }
    if (!user.password_hash) {
        res.status(401).json({ error: "Wrong email or password" });
        return;
    }
    const cmpResult = yield bcrypt_1.compare(password, user.password_hash);
    if (cmpResult === true) {
        if (!user.verified) {
            res.status(403).json({ error: "You are not verified" });
            return;
        }
        req.session.user_id = user.id;
        res.sendStatus(200);
        return;
    }
    res.status(401).json({ error: "Wrong email or password" });
}));
// GOOGLE AUTH    GOOGLE AUTH    GOOGLE AUTH
router.get("/google", (req, res) => {
    const state = googleAuth_1.getState();
    req.session.state = state;
    const authUrl = googleAuth_1.getAuthUrl(state);
    res.redirect(authUrl);
});
router.get("/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const successRedirect = (req, res) => {
        if (!process.env.FRONTEND_LOGIN_SUCCESS_URL) {
            throw new Error("URL environment variables not set");
        }
        if (req.session.redirect) {
            try {
                res.redirect(req.session.redirect);
                req.session.redirect = undefined;
                return;
            }
            catch (e) {
                console.error("Redirect failed: " + e);
            }
        }
        res.redirect(process.env.FRONTEND_LOGIN_SUCCESS_URL);
    };
    const code = req.query.code;
    const state = req.query.state;
    const error = req.query.error;
    if (error) {
        logging_1.logError(error);
        res.redirect(process.env.FRONTEND_ERROR_URL + "Unknown error");
        return;
    }
    else if (req.session.state !== state) {
        res.redirect(process.env.FRONTEND_ERROR_URL + "Mismatch in google auth state");
        return;
    }
    else {
        delete req.session.state;
        const userData = yield googleAuth_1.getUserData(code);
        if (!userData) {
            res.redirect(process.env.FRONTEND_ERROR_URL + "UserData from google was empty");
            return;
        }
        if (!userData.email) {
            res.redirect(process.env.FRONTEND_ERROR_URL + "UserData from google is missing");
            return;
        }
        const email = userData.email.toLowerCase();
        let user = yield userService_1.getUserByEmail(email);
        if (user !== null) {
            if (user.password_hash) {
                res.redirect(process.env.FRONTEND_ERROR_URL + "Please sign in with password");
                return;
            }
            else {
                req.session.user_id = user.id;
                successRedirect(req, res);
                return;
            }
        }
        if (!userData.name) {
            res.redirect(process.env.FRONTEND_ERROR_URL + "UserData from google is missing");
            return;
        }
        const user_id = yield userService_1.insertUser(userData.name, email, (_a = userData.picture) !== null && _a !== void 0 ? _a : null, null, true);
        if (!user_id) {
            console.warn("Google Auth: Failed to create user: " + email);
            res.redirect(process.env.FRONTEND_ERROR_URL + "Failed to create user");
            return;
        }
        req.session.user_id = user_id;
        successRedirect(req, res);
    }
}));
exports.default = router;
