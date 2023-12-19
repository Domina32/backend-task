import { describe, it, expect, jest } from "@jest/globals";
import { AppDataSource } from "@/models/data-source";
import userService from "@/services/user.service";

jest.spyOn(AppDataSource.manager, "save").mockImplementation(async () => {});

describe("userService.createEntry()", () => {
    it("should create new DB entry", async () => {
        await userService.createEntry(
            "test@email.com",
            "test password",
            "test first name",
            "test last name",
        );

        expect(AppDataSource.manager.save).toHaveBeenCalled();
    });
});
