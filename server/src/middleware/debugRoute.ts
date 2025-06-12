import { NextFunction, Request, Response } from "express";

function debugRoute(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method}: ${req.originalUrl}`);
    if (req.body) {
        console.log(`body: ${req.body}`);
    }
    next();
}

export default debugRoute;
