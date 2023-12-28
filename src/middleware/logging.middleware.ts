import { NextFunction, Request, Response } from "express";

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    console.log(`${req.method} ${req.path}`);
    // console.log(`query: ${JSON.stringify(req.query)}`);

    next();

    return;
};
