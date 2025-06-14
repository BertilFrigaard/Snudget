import express from "express";
import session from "express-session";
const app = express();
import cors from "cors";

import routes from "./routes/index";
import { debugRoute } from "./middleware/debugRoute";

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

if (!process.env.SESSION_SECRET) {
    throw new Error("Session environment variables missing");
}

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

//Add routes last
app.use(debugRoute, routes);

export default app;
