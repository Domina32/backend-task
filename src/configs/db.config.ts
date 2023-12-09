import fs from "fs";
const env = process.env;

const db = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME || "jokes",
    port: env.DB_PORT || 5432,
    ssl: {
        mode: "VERIFY_IDENTITY",
        ca: fs.readFileSync("/etc/ssl/cert.pem", "utf-8"),
    },
};

export default db;
