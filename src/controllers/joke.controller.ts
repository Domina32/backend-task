import { NextFunction, Response, Request } from "express";
import jokeService from "@/services/joke.service";

async function getNew(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const joke = res.json(await jokeService.getNewRandom());
        create(req, res, next);
    } catch (e: unknown) {
        console.error(`Error getting new joke from API`, (e as Error).message);
        next(e);
    }
}

async function getHistory(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await jokeService.get());
    } catch (e: unknown) {
        console.error(`Error getting joke`, (e as Error).message);
        next(e);
    }
}

async function create(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await jokeService.create());
    } catch (e: unknown) {
        console.error(`Error creating joke`, (e as Error).message);
        next(e);
    }
}

async function update(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await jokeService.update());
    } catch (e: unknown) {
        console.error(`Error updating joke`, (e as Error).message);
        next(e);
    }
}

// TODO
async function updatePartial(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {}

async function remove(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        res.json(await jokeService.remove());
    } catch (e: unknown) {
        console.error(`Error removing joke`, (e as Error).message);
        next(e);
    }
}

export default {
    getNew,
    getHistory,
    create,
    update,
    updatePartial,
    remove,
};
