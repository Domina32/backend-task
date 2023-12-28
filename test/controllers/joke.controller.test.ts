import { describe, it, expect, jest } from "@jest/globals";
import jokeController from "@/controllers/joke.controller";
import { Request, Response, NextFunction } from "express";
import jokeService from "@/services/joke.service";
import { UserAuthRequest } from "@/middleware/authentication.middleware";

jest.mock("../../src/services/joke.service");
jest.mock("../../src/services/user.service");

describe("joke.controller.fetchNew()", () => {
    it("should fetch new joke", async () => {
        const req = { user: { id: 1 } } as UserAuthRequest;
        const res = { json: () => {} } as Response;
        const next = (() => {}) as NextFunction;
        await jokeController.fetchNew(req, res, next);

        expect(jokeService.fetchNewRandom).toHaveBeenCalled();
        expect(jokeService.createEntry).toHaveBeenCalled();
        expect(jokeService.createEntry).toHaveBeenCalledWith("my mocked joke");
    });
});

describe("joke.controller.getHistory()", () => {
    it("should get previous jokes for the current user", async () => {
        const req = { user: { id: 100 } } as UserAuthRequest;
        const res = { json: () => {} } as Response;
        const next = (() => {}) as NextFunction;
        await jokeController.getHistory(req, res, next);

        expect(jokeService.getEntries).toHaveBeenCalledWith(100);
    });
});
