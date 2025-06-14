import express, { Request, Response } from "express";
import { getAuthUrl, getState, getUserData } from "../services/auth/googleAuth";
import { getUserByEmail, insertUser } from "../services/data/userService";
import { authRoute } from "../middleware/authRoute";
import { logError } from "../utils/logging";
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
            req.session.user_id = user.id;
            successRedirect(req, res);
            return;
        }

        if (!userData.name) {
            // TODO Redirect to frontend error display instead
            console.warn("Google Auth: UserData exists but is missing .name");
            res.redirect("/auth/google");
            return;
        }

        const success = await insertUser(userData.name, userData.email, userData.picture ?? null, null);
        if (!success) {
            // TODO Redirect to frontend error display instead
            console.warn("Google Auth: Failed to create user: " + userData.email);
            res.redirect("/auth/google");
            return;
        }

        user = await getUserByEmail(userData.email);
        if (user != null) {
            req.session.user_id = user.id;
            successRedirect(req, res);
            return;
        }

        console.error("Google Auth: User was inserted, but can't be found by email!");
        res.status(500).json({ error: "Something went wrong!" });
        return;
    }
});

export default router;
