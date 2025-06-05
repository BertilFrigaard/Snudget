import express from "express";
import session from "express-session";
const app = express();
import { CipherKey } from "crypto";
import cors from "cors";

import routes from "./routes/index";
import debugRoute from "./middleware/debugRoute";

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET as CipherKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

//Add routes last
app.use(debugRoute, routes);

export default app;
