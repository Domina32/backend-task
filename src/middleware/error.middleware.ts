import { NextFunction, Request, Response } from "express";

interface ResponseError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: ResponseError,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    console.log("Cek sekund");
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
};
