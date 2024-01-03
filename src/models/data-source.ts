import "reflect-metadata";
import { DataSource } from "typeorm";
import { Joke } from "./entities/Joke";
import { User } from "./entities/User";
import dbConfig from "../configs/db.config";

const env = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [Joke, User],
    migrations: ["src/models/migrations/**/*.ts"],
    subscribers: [],
    dropSchema: env.NODE_ENV === "test" ? true : false,
});
