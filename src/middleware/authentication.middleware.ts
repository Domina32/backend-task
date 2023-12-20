import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const env = process.env;

export interface UserAuthRequest extends Request {
    user?: {
        id?: number;
        iat?: number;
    };
}

async function verifyUserToken(
    req: UserAuthRequest,
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
        if (typeof verifiedUser === "string") {
            throw new Error("invalid token payload");
        } else {
            req.user = verifiedUser;
        }

        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

export { verifyUserToken };
