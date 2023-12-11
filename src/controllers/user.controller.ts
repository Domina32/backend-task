import { NextFunction, Response, Request } from "express";
import userService from "@/services/user.service";
import { User, UserType } from "@/models/entities/User";

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

        res.json(user);
        await userService.createEntry(
            user.email,
            user.password,
            user.firstName,
            user.lastName,
        );

        // res.json(await userService.createEntry());
    } catch (e: unknown) {
        console.error(`Error creating user`, (e as Error).message);
        next(e);
    }
}

export default { create };
