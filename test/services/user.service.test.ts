import { describe, it, expect, jest } from "@jest/globals";
import { AppDataSource } from "@/models/data-source";
import userService from "@/services/user.service";
import { User } from "@/models/entities/User";

jest.spyOn(AppDataSource.manager, "save").mockImplementation(async () => {});
jest.spyOn(AppDataSource.manager, "findOne").mockImplementation(async () => {
    return null;
});

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

describe("userService.assignJokeToUser()", () => {
    it("should assign fetched joke to current user", async () => {
        const joke = { id: 100, value: "100" };
        const user = {
            id: 100,
            email: "100@100.com",
            password: "pass",
            firstName: "first",
            lastName: "last",
        };
        await userService.assignJokeToUser(joke, user);

        expect(AppDataSource.manager.save).toHaveBeenCalled();
    });
});

describe("userService.getEntry()", () => {
    it("should get user with given id", async () => {
        await userService.getEntry(100);

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
