const env = process.env;

const db = {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "domina",
    password: env.DB_PASSWORD || "domina",
    database: env.NODE_ENV === "test" ? env.DB_NAME_TEST : env.DB_NAME,
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
};

export default db;
