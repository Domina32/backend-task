const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
);
interface userType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const user: userType = {
    email: "email",
    password: "password",
    firstName: "first name",
    lastName: "last name",
};
