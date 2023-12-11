import { AppDataSource } from "@/models/data-source";
import { User, UserType } from "@/models/entities/User";

const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
);

async function createEntry(
    email: UserType["email"],
    password: UserType["password"],
    firstName: UserType["firstName"],
    lastName: UserType["lastName"],
): Promise<void> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    AppDataSource.manager.save(user);
}

export default { createEntry };
