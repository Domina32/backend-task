import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

const env = process.env;

async function verifyUserToken(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    // try {
    //     const authHeader = req.headers["auth-token"];
    //     let token = req.headers.authorization;

    //     console.info("token: ", token);
    //     console.info("auth header: ", authHeader);

    //     // token = authHeader && authHeader.split(" ")[1];

    //     if (token == null) {
    //         res.status(401).send("Unauthorized request");
    //         return;
    //     }

    //     const verifiedUser = jwt.verify(token, env.TOKEN_SECRET || "secret");
    //     if (!verifiedUser) res.status(401).send("Unauthorized request");

    //     req.body = verifiedUser;

    //     console.info("in verifyUserToken() before next()");
    //     next();
    // }

    let token = req.headers.authorization;

    if (!token) {
        res.status(401).send("Access Denied / Unauthorized request");
        return;
    }

    try {
        token = token.split(" ")[1]; // Remove Bearer from string

        if (token === "null" || !token) {
            res.status(401).send("Unauthorized request");
            return;
        }
        let verifiedUser = jwt.verify(token, env.TOKEN_SECRET || "secret"); // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) {
            res.status(401).send("Unauthorized request");
            return;
        }

        // req.user = verifiedUser;

        req.body = verifiedUser;

        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

export { verifyUserToken };
