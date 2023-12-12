import { NextFunction, Response, Request } from "express";
import userService from "@/services/user.service";
import { User, UserType } from "@/models/entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/models/data-source";

const env = process.env;

async function create(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const user: UserType = new User();
        user.email = "email";
        user.password = "pass";
        user.firstName = "first name";
        user.lastName = "last name";
        user.signedUp = false;

        res.json(user);
        await userService.createEntry(
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.signedUp,
        );

        // res.json(await userService.createEntry());
    } catch (e: unknown) {
        console.error(`Error creating user`, (e as Error).message);
        next(e);
    }
}

async function login(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const user = await AppDataSource.manager.findOneBy(User, {
            email: req.body.email,
        });

        if (!user) {
            res.status(401).send("No user with this email");
        } else {
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!validPass) {
                res.status(401).send("Email or password is incorrect");
                return;
            }

            let payload = {
                id: user.id,
                user_type_id: req.body.user_type_id || false,
            };

            const token = jwt.sign(payload, env.TOKEN_SECRET || "secret");

            res.status(200).header("auth-token", token).send({ token: token });
        }
    } catch (e: unknown) {
        console.error(`Error logging in`, (e as Error).message);
        next(e);
    }
}

async function signup(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User();
        user.email = req.body.email;
        user.password = hashPassword;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.signedUp = req.body.signedUp || false;

        await userService.createEntry(
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.signedUp,
        );

        let payload = {
            id: user.id,
            user_type_id: req.body.user_type_id || false,
        };

        const token = jwt.sign(payload, env.TOKEN_SECRET || "secret");

        res.status(200).send({ token });
    } catch (e: unknown) {
        console.error(`Error signing up`, (e as Error).message);
        next(e);
    }
}

export default { create, login, signup };
