import express, { Request, Response } from "express";
import { getAuthUrl, getState, getUserData } from "../services/auth/googleAuth";
import { deleteUser, getUserByEmail, insertUser, verifyUser } from "../services/data/userService";
import { authRoute } from "../middleware/authRoute";
import { logError } from "../utils/logging";
import { compare } from "bcrypt";
import { generateToken, hash } from "../utils/crypto";
import { sendVerifyLink } from "../services/external/emailService";
import { deleteToken, getTokenHashByUserId, insertToken } from "../services/data/tokenService";
const router = express.Router();

router.post("/logout", authRoute, (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: "Session could not be destroyed" });
        } else {
            res.clearCookie("session");
            res.sendStatus(200);
        }
    });
});

router.get("/status", (req: Request, res: Response) => {
    res.json({ logged_in: req.session.user_id != null });
});

router.get("/verify", async (req: Request, res: Response) => {
    if (!req.query.token || !req.query.user_id) {
        res.status(400).json({ error: "Missing query" });
        return;
    }

    const tokenHash = await getTokenHashByUserId(req.query.user_id as string);
    if (!tokenHash) {
        res.status(403).json({ error: "Wrong user id or token" });
        return;
    }

    if (!(await compare(req.query.token as string, tokenHash))) {
        res.status(403).json({ error: "Wrong user id or token" });
        return;
    }

    if (!verifyUser(req.query.user_id as string)) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }

    deleteToken(req.query.user_id as string);
    res.redirect((process.env.FRONTEND_LOGIN_SUCCESS_URL as string) + "/login");
});

// NORMAL AUTH    NORMAL AUTH    NORMAL AUTH

router.post("/signup", async (req: Request, res: Response) => {
    if (req.session.user_id) {
        res.status(403).json({ error: "You are already logged in" });
        return;
    }

    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ error: "Wrong body format" });
        return;
    }

    const username: string = req.body.username;
    const email: string = (req.body.email as string).toLowerCase();
    const password: string = req.body.password;

    const user = await getUserByEmail(email);
    if (user) {
        if (user.verified) {
            res.status(200).json({ error: "Check your email for further instructions" });
            return;
        }
        if (!(await deleteUser(user.id))) {
            res.status(500).json({ error: "Server error" });
            return;
        }
    }

    const user_id = await insertUser(username, email, null, await hash(password), false);
    if (user_id) {
        const token = generateToken();
        const tokenHash = await hash(token);
        if (!(await insertToken(tokenHash, user_id))) {
            res.status(500).json({ error: "Something went wrong" });
            await deleteUser(user_id);
            return;
        }

        if (!(await sendVerifyLink(token, user_id, req.body.email))) {
            await deleteToken(user_id);
            await deleteUser(user_id);
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.status(200).json({ error: "Check your email for further instructions" });
        return;
    }
    res.status(500).json({ error: "Something went wrong" });
});

router.post("/login", async (req: Request, res: Response) => {
    if (req.session.user_id) {
        res.status(403).json({ error: "You are already logged in" });
        return;
    }

    if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Wrong body format" });
        return;
    }

    const password: string = req.body.password;
    const email: string = (req.body.email as string).toLowerCase();

    const user = await getUserByEmail(email);
    if (!user) {
        res.status(401).json({ error: "Wrong email or password" });
        return;
    }

    if (!user.password_hash) {
        res.status(401).json({ error: "Wrong email or password" });
        return;
    }

    const cmpResult = await compare(password, user.password_hash);
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
});

// GOOGLE AUTH    GOOGLE AUTH    GOOGLE AUTH

router.get("/google", (req: Request, res: Response) => {
    const state = getState();
    req.session.state = state;
    const authUrl = getAuthUrl(state);
    res.redirect(authUrl);
});

router.get("/google/callback", async (req, res) => {
    const successRedirect = (req: Request, res: Response) => {
        if (!process.env.FRONTEND_LOGIN_SUCCESS_URL) {
            throw new Error("URL environment variables not set");
        }
        if (req.session.redirect) {
            try {
                res.redirect(req.session.redirect);
                req.session.redirect = undefined;
                return;
            } catch (e) {
                console.error("Redirect failed: " + e);
            }
        }
        res.redirect(process.env.FRONTEND_LOGIN_SUCCESS_URL as string);
    };

    const code = req.query.code;
    const state = req.query.state;
    const error = req.query.error;
    if (error) {
        logError(error);
        res.redirect(process.env.FRONTEND_ERROR_URL + "Unknown error");
        return;
    } else if (req.session.state !== state) {
        res.redirect(process.env.FRONTEND_ERROR_URL + "Mismatch in google auth state");
        return;
    } else {
        delete req.session.state;
        const userData = await getUserData(code as string);
        if (!userData) {
            res.redirect(process.env.FRONTEND_ERROR_URL + "UserData from google was empty");
            return;
        }
        if (!userData.email) {
            res.redirect(process.env.FRONTEND_ERROR_URL + "UserData from google is missing");
            return;
        }
        const email = userData.email.toLowerCase();
        let user = await getUserByEmail(email);
        if (user !== null) {
            if (user.password_hash) {
                res.redirect(process.env.FRONTEND_ERROR_URL + "Please sign in with password");
                return;
            } else {
                req.session.user_id = user.id;
                successRedirect(req, res);
                return;
            }
        }

        if (!userData.name) {
            res.redirect(process.env.FRONTEND_ERROR_URL + "UserData from google is missing");
            return;
        }

        const user_id = await insertUser(userData.name, email, userData.picture ?? null, null, true);
        if (!user_id) {
            console.warn("Google Auth: Failed to create user: " + email);
            res.redirect(process.env.FRONTEND_ERROR_URL + "Failed to create user");
            return;
        }

        req.session.user_id = user_id;
        successRedirect(req, res);
    }
});

export default router;
