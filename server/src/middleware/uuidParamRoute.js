"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../utils/validation");
function uuidParamRoute(req, res, next) {
    if (!req.params.id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }
    if (!validation_1.isValidUUID(req.params.id)) {
        res.status(400).json({ error: "Invalid UUID" });
        return;
    }
    next();
}
exports.default = uuidParamRoute;
