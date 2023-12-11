const env = process.env;

const db = {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "domina",
    password: env.DB_PASSWORD || "domina",
    database: env.DB_NAME || "default",
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
};

export default db;
