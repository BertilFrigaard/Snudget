"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function debugRoute(req, res, next) {
    console.log(`${req.method}: ${req.originalUrl}`);
    if (req.body) {
        console.log(`body: ${req.body}`);
    }
    next();
}
exports.debugRoute = debugRoute;
