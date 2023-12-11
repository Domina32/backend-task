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
        // Remove Bearer from string
        token = token.split(" ")[1];

        if (token === "null" || !token)
            res.status(401).send("Unauthorized request");

        let verifiedUser = jwt.verify(token, env.TOKEN_SECRET || "secret");
        if (!verifiedUser) res.status(401).send("Unauthorized request");

        // user_id & user_type_id
        req.body = verifiedUser;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}
async function IsUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    if (req.body.user_type_id === 0) {
        next();
    }
    res.status(401).send("Unauthorized!");
}
async function IsAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    if (req.body.user_type_id === 1) {
        next();
    }
    res.status(401).send("Unauthorized!");
}

export { verifyUserToken, IsUser, IsAdmin };
