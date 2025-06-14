import { NextFunction, Request, Response } from "express";
import { isValidUUID } from "../utils/validation";

export default function uuidParamRoute(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }
    if (!isValidUUID(req.params.id)) {
        res.status(400).json({ error: "Invalid UUID" });
        return;
    }
    next();
}
