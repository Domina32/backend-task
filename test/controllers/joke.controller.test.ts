import { describe, it, expect, jest } from "@jest/globals";
import jokeController from "@/controllers/joke.controller";
import { Request, Response, NextFunction } from "express";
import jokeService from "@/services/joke.service";

jest.mock("../../src/services/joke.service");

describe("joke.controller.fetchNew()", () => {
    it("should fetch new joke", async () => {
        const req = {} as Request;
        const res = { json: () => {} } as Response;
        const next = (() => {}) as NextFunction;
        await jokeController.fetchNew(req, res, next);

        expect(jokeService.fetchNewRandom).toHaveBeenCalled();
        expect(jokeService.createEntry).toHaveBeenCalled();
        expect(jokeService.createEntry).toHaveBeenCalledWith("my mocked joke");
    });
});
