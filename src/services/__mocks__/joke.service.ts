import { UserDto } from "@/models/entities/User";
import { jest } from "@jest/globals";

const fetchNewRandom = jest.fn(async () => {
    return { value: "my mocked joke" };
});

const createEntry = jest.fn(async (text: string) => {
    return;
});

const getEntries = jest.fn(async (id: UserDto["id"]) => {
    return;
});

export default { fetchNewRandom, createEntry, getEntries };
