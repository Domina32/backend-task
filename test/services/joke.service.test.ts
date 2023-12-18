import { describe, it, expect, jest } from "@jest/globals";
import jokeService from "@/services/joke.service";
import { AppDataSource } from "@/models/data-source";

global.fetch = jest.fn(async () => {
    const myResponse = {
        json: async () => {
            return { value: "my joke" };
        },
    };
    return myResponse as Response;
});

jest.spyOn(AppDataSource.manager, "save").mockImplementation(async () => {});

describe("jokeService.fetchNewRandom()", () => {
    it("should fetch new random joke", async () => {
        await jokeService.fetchNewRandom();

        expect(fetch).toHaveBeenCalled();
    });
});

describe("jokeService.createEntry()", () => {
    it("should create new joke entry", async () => {
        await jokeService.createEntry("mocked joke");

        expect(AppDataSource.manager.save).toHaveBeenCalled();
    });
});
