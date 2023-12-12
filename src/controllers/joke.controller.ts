import { NextFunction, Response, Request } from "express";
import jokeService from "@/services/joke.service";

async function fetchNew(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const joke = await jokeService.fetchNewRandom();
        res.json(joke);
        await jokeService.createEntry(joke.value);
    } catch (e: unknown) {
        console.error(`Error getting new joke from API`, (e as Error).message);
        next(e);
    }
}

// TODO
async function getHistory(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await jokeService.getEntries());
    } catch (e: unknown) {
        console.error(`Error getting joke`, (e as Error).message);
        next(e);
    }
}
// TODO
async function create(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const joke = res.json();

        // res.json(await jokeService.createEntry());
    } catch (e: unknown) {
        console.error(`Error creating joke`, (e as Error).message);
        next(e);
    }
}

export default {
    fetchNew,
    getHistory,
    create,
};
