import { AppDataSource } from "@/models/data-source";
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

export default { createEntry };
