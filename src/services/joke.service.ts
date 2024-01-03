import { AppDataSource } from "@/models/data-source";
import { Joke, JokeDto } from "@/models/entities/Joke";
import { User, UserDto } from "@/models/entities/User";

async function fetchNewRandom(): Promise<JokeDto> {
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    return response.json();
}

async function getEntries(userId: UserDto["id"]): Promise<Joke[]> {
    const user = await AppDataSource.manager.findOne(User, {
        where: {
            id: userId,
        },
        relations: {
            jokes: true,
        },
    });

    return user?.jokes || [];
}

async function createEntry(text: JokeDto["value"]): Promise<JokeDto> {
    const joke = new Joke();
    joke.value = text;
    return AppDataSource.manager.save(Joke, joke);
}

export default {
    fetchNewRandom,
    getEntries,
    createEntry,
};
