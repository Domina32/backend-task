import "reflect-metadata";
import { DataSource } from "typeorm";
import { Joke } from "@/models/entities/Joke";
import { User } from "@/models/entities/User";
import dbConfig from "@/configs/db.config";

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
    migrations: [],
    subscribers: [],
});
