import { describe, it, expect, jest } from "@jest/globals";
import jokeService from "@/services/joke.service";

global.fetch = jest.fn(async () => {
    const myResponse = {
        json: async () => {
            return { value: "my joke" };
        },
    };
    return myResponse as Response;
});

describe("jokeService.fetchNewRandom()", () => {
    it("should fetch new random joke", async () => {
        await jokeService.fetchNewRandom();

        expect(fetch).toHaveBeenCalled();
    });
});

// todo createEntry()
