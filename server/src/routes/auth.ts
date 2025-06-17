import express, { Request, Response } from "express";
import { getAuthUrl, getState, getUserData } from "../services/auth/googleAuth";
import { getUserByEmail, insertUser, verifyUser } from "../services/data/userService";
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

    const user = await getUserByEmail(req.body.email);
    if (user) {
        // TODO if user not verified replace current entry and update token and resend email
        console.error("NOT IMPLEMENTED: auth.ts");
        if (!(1 == 1)) {
            res.status(500).json({ error: "Something went wrong" });
            return;
        }
        res.status(200).json({ error: "Check your email for further instructions" });
        return;
    }

    const user_id = await insertUser(req.body.username, req.body.email, null, await hash(req.body.password), false);
    if (user_id) {
        const token = generateToken();
        const tokenHash = await hash(token);
        if (!(await insertToken(tokenHash, user_id))) {
            res.status(500).json({ error: "Something went wrong" });
            // TODO delete user
            return;
        }

        if (!(await sendVerifyLink(token, user_id, req.body.email))) {
            deleteToken(user_id);
            // TODO delete user
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

    const user = await getUserByEmail(req.body.email);
    if (!user) {
        res.status(401).json({ error: "Wrong email or password" });
        return;
    }

    if (!user.password_hash) {
        res.status(401).json({ error: "Wrong email or password" });
        return;
    }

    const cmpResult = await compare(req.body.password, user.password_hash);
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
    // TODO implement frontend redirection to display detailed error
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
        // TODO Do something else here
        logError(error);
        res.status(500).json({ error: "Something went wrong" });
        return;
    } else if (req.session.state !== state) {
        // TODO Redirect to frontend error display instead
        console.warn("Mismatch in google auth state");
        res.redirect("/auth/google");
        return;
    } else {
        delete req.session.state;
        const userData = await getUserData(code as string);
        if (!userData) {
            // TODO Redirect to frontend error display instead
            console.warn("UserData in google auth was empty");
            res.redirect("/auth/google");
            return;
        }
        if (!userData.email) {
            // TODO Redirect to frontend error display instead
            console.warn("Google Auth: UserData exists but is missing .email");
            res.redirect("/auth/google");
            return;
        }
        let user = await getUserByEmail(userData.email);
        if (user !== null) {
            if (user.password_hash) {
                res.status(403).json({ error: "Wrong username or password" });
                return;
            } else {
                req.session.user_id = user.id;
                successRedirect(req, res);
                return;
            }
        }

        if (!userData.name) {
            // TODO Redirect to frontend error display instead
            console.warn("Google Auth: UserData exists but is missing .name");
            res.redirect("/auth/google");
            return;
        }

        const user_id = await insertUser(userData.name, userData.email, userData.picture ?? null, null, true);
        if (!user_id) {
            // TODO Redirect to frontend error display instead
            console.warn("Google Auth: Failed to create user: " + userData.email);
            res.redirect("/auth/google");
            return;
        }

        req.session.user_id = user_id;
        successRedirect(req, res);
    }
});

export default router;
