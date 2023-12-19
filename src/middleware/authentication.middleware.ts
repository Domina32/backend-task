import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

const env = process.env;

async function verifyUserToken(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).send("Access Denied / Unauthorized request");
        return;
    }

    try {
        token = token.split(" ")[1];

        if (token === "null" || !token) {
            res.status(401).send("Unauthorized request");
            return;
        }

        let verifiedUser = jwt.verify(token, env.TOKEN_SECRET);

        req.body = verifiedUser;

        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

export { verifyUserToken };
