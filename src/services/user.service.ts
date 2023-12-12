import { AppDataSource } from "@/models/data-source";
import { User, UserType } from "@/models/entities/User";

const validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

async function createEntry(
    email: UserType["email"],
    password: UserType["password"],
    firstName: UserType["firstName"],
    lastName: UserType["lastName"],
    signedUp: UserType["signedUp"],
): Promise<void> {
    const user = new User();

    if (validateEmail(email)) user.email = email;
    else {
        throw new Error("Email invalid");
    }

    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.signedUp = signedUp;

    AppDataSource.manager.save(user);
}

export default { createEntry };
