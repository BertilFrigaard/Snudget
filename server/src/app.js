"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const debugRoute_1 = require("./middleware/debugRoute");
app.use(express_1.default.json());
app.use(cors_1.default({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
if (!process.env.SESSION_SECRET) {
    throw new Error("Session environment variables missing");
}
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
//Add routes last
app.use(debugRoute_1.debugRoute, index_1.default);
exports.default = app;
