import express from "express";
import { getAuthUrl, getState, getUserData } from "../features/auth/google/googleAuth";

declare module "express-session" {
    interface SessionData {
        state?: string;
    }
}

const router = express.Router();

router.get("/google", (req, res) => {
    const state = getState();
    req.session.state = state;
    const authUrl = getAuthUrl(state);
    res.redirect(authUrl);
});

router.get("/google/callback", async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const error = req.query.error;
    if (error) {
        // TODO Do something else here
        console.log("Error: " + error);
        res.end("Error");
        return;
    } else if (req.session.state !== state) {
        // TODO Give the user info before redirecting
        res.redirect("/auth/google");
        return;
    } else {
        const userData = await getUserData(code as string);
        if (!userData) {
            // TODO Give the user info before redirecting
            res.redirect("/auth/google");
            return;
        }
        res.send(userData);
    }
});

export default router;
