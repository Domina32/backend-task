import { NextFunction, Response, Request } from "express";
import jokeService from "@/services/joke.service";
import { sendEmail } from "@/services/email.service";
import { UserAuthRequest } from "@/middleware/authentication.middleware";
import userService from "@/services/user.service";

async function fetchNew(
    req: UserAuthRequest,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const joke = await jokeService.fetchNewRandom();

        res.json(joke);
        const dbJoke = await jokeService.createEntry(joke.value);

        if (!req.user?.id) {
            throw new Error("missing user id");
        }

        const userId = req.user.id;
        const recipient = await userService.getEntry(userId);

        if (!recipient) {
            throw new Error("no user with given id");
        }

        await sendEmail(
            { subject: "Incoming joke", text: joke.value },
            { emailAddress: recipient.email },
        );

        userService.assignJokeToUser(dbJoke, recipient);
    } catch (e: unknown) {
        console.error(`Error getting new joke from API`, (e as Error).message);
        next(e);
    }
}

async function getHistory(
    req: UserAuthRequest,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        if (!req.user?.id) {
            throw new Error("missing user id");
        }

        const userId = req.user.id;

        res.json(await jokeService.getEntries(userId));
    } catch (e: unknown) {
        console.error(`Error getting joke`, (e as Error).message);
        next(e);
    }
}

export default {
    fetchNew,
    getHistory,
};
