import { describe, it, expect, jest } from "@jest/globals";
import { insert } from "@/models/entities/Joke";
import { AppDataSource } from "@/models/data-source";

jest.spyOn(AppDataSource.manager, "save").mockImplementation(async () => {});

describe("Joke insert()", () => {
    it("should insert given joke into db", async () => {
        await insert("mock joke");

        expect(AppDataSource.manager.save).toHaveBeenCalled();
    });
});
