"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authRoute(req, res, next) {
    if (!req.session.user_id) {
        res.status(401).json({ error: "You are not logged in" });
        return;
    }
    next();
}
exports.authRoute = authRoute;
