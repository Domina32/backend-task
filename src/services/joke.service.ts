import { AppDataSource } from "@/models/data-source";
import { Joke, JokeType } from "@/models/entities/Joke";

async function fetchNewRandom(): Promise<JokeType> {
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    return response.json();
}

// TODO
async function getEntries(): Promise<void> {}

async function createEntry(text: JokeType["value"]): Promise<void> {
    const joke = new Joke();
    joke.value = text;
    AppDataSource.manager.save(Joke, joke);
}

// TODO
async function updateEntry(): Promise<void> {}

// TODO
async function removeEntry(): Promise<void> {}

export default {
    fetchNewRandom,
    getEntries,
    createEntry,
    updateEntry,
    removeEntry,
};
