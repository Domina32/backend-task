import db from "@/services/db.service";
import { JokeType } from "@/models/joke";

async function getNewRandom(): Promise<JokeType> {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    return response.json();
}

async function get(): Promise<void> {}

async function create(joke: JokeType): Promise<void> {
    await db.query(`INSERT INTO jokes(value) VALUES (${joke.value});`);
}

async function update(): Promise<void> {}

async function remove(): Promise<void> {}

export default {
    getNewRandom,
    get,
    create,
    update,
    remove,
};
