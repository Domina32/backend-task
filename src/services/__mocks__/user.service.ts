import { jest } from "@jest/globals";
import { UserType } from "@/models/entities/User";

const createEntry = jest.fn(
    async (
        email: UserType["email"],
        password: UserType["password"],
        firstName: UserType["firstName"],
        lastName: UserType["lastName"],
        signedUp: UserType["signedUp"],
    ) => {},
);

export default { createEntry };
