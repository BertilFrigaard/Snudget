import express from "express";
import { getAuthUrl, getState, getUserData } from "../services/auth/googleAuth";
import { getUserByEmail, insertUser } from "../services/data/userService";
import authRoute from "../middleware/authRoute";
const router = express.Router();

router.post("/debuglogin", async (req, res) => {
    const email: string | undefined = req.body.email;

    if (!email) {
        res.status(400).json({ error: "Please provide email" });
        return;
    }

    const user = await getUserByEmail(email);

    if (!user) {
        res.status(404).json({ error: "Could not find user with given email" });
        return;
    }

    req.session.user_id = user.id;
    res.status(200).json({ id: user.id });
    return;
});

router.post("/logout", authRoute, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: "Session could not be destroyed" });
        } else {
            res.status(200);
        }
    });
});

router.get("/status", (req, res) => {
    res.json({ logged_in: req.session.user_id !== undefined && req.session.user_id !== null });
});

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
        if (!userData.email) {
            // TODO Tell the user some info is missing before redirect
            res.redirect("/auth/google");
            return;
        }
        let user = await getUserByEmail(userData.email);
        if (user != null) {
            req.session.user_id = user.id;
            res.redirect(process.env.FRONTEND_LOGIN_SUCCESS_URL as string);
            return;
        }

        const success = await insertUser(userData.name || "hi", userData.email, userData.picture ?? null, null);
        if (!success) {
            // TODO Tell the user some info is missing before redirect
            res.redirect("/auth/google");
            return;
        }

        user = await getUserByEmail(userData.email);
        if (user != null) {
            req.session.user_id = user.id;
            res.redirect(process.env.FRONTEND_LOGIN_SUCCESS_URL as string);
            return;
        }

        res.send("Everything failed");
        return;
    }
});

export default router;
