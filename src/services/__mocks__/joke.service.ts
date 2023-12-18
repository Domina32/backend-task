import { jest } from "@jest/globals";

const fetchNewRandom = jest.fn(async () => {
    return { value: "my mocked joke" };
});

const createEntry = jest.fn(async (text: string) => {
    return;
});

export default { fetchNewRandom, createEntry };
