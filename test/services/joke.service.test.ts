import { describe, it, expect, jest } from "@jest/globals";
import jokeService from "@/services/joke.service";
import { AppDataSource } from "@/models/data-source";
import { User } from "@/models/entities/User";

global.fetch = jest.fn(async () => {
    const myResponse = {
        json: async () => {
            return { value: "my joke" };
        },
    };
    return myResponse as Response;
});

jest.spyOn(AppDataSource.manager, "save").mockImplementation(async () => {});
jest.spyOn(AppDataSource.manager, "findOne").mockImplementation(async () => {
    return null;
});

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

describe("jokeService.getEntries()", () => {
    it("should get jokes for given user id", async () => {
        await jokeService.getEntries(100);

        expect(AppDataSource.manager.findOne).toHaveBeenCalledWith(User, {
            where: {
                id: 100,
            },
            relations: {
                jokes: true,
            },
        });
    });
});
