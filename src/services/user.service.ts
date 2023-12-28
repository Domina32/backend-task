import { AppDataSource } from "@/models/data-source";
import { Joke, JokeDto } from "@/models/entities/Joke";
import { User, UserDto } from "@/models/entities/User";

const validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

async function createEntry(
    email: UserDto["email"],
    password: UserDto["password"],
    firstName: UserDto["firstName"],
    lastName: UserDto["lastName"],
): Promise<UserDto> {
    if (!validateEmail(email)) throw new Error("Email invalid");

    const user = await AppDataSource.manager.save(User, {
        email,
        password,
        firstName,
        lastName,
    });

    return user;
}

async function assignJokeToUser(joke: Joke, user: User): Promise<void> {
    const userJokes = user.jokes || [];
    const jokeUsers = joke.users || [];

    jokeUsers.push(user);
    userJokes.push({ ...joke, users: jokeUsers });

    user.jokes = userJokes;

    await AppDataSource.manager.save(User, user);
}

async function getEntry(id: UserDto["id"]): Promise<UserDto | null> {
    const user = await AppDataSource.manager.findOne(User, {
        where: {
            id,
        },
        relations: {
            jokes: true,
        },
    });

    return user;
}

export default { createEntry, getEntry, assignJokeToUser };
