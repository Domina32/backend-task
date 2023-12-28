import { jest } from "@jest/globals";
import { UserDto } from "@/models/entities/User";

const assignJokeToUser = jest.fn(async () => {});

const getEntry = jest.fn(async (id: UserDto["id"]) => {
    return {
        id: 5,
        email: "FindTest@email.com",
        password: "test password",
        firstName: "test first name",
        lastName: "test last name",
    };
});

const createEntry = jest.fn(
    async (
        email: UserDto["email"],
        password: UserDto["password"],
        firstName: UserDto["firstName"],
        lastName: UserDto["lastName"],
    ) => {
        return {
            id: 5,
            email: "FindTest@email.com",
            password: "test password",
            firstName: "test first name",
            lastName: "test last name",
        };
    },
);

export default { assignJokeToUser, getEntry, createEntry };
