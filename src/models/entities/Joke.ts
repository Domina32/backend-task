import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { AppDataSource } from "@/models/data-source";
import { User } from "./User";

export interface JokeType {
    id: number;
    value: string;
}

@Entity()
export class Joke {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToMany(() => User, (user) => user.jokes, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    users?: User[];
}

export async function insert(value: string) {
    const joke = new Joke();
    joke.value = value;

    await AppDataSource.manager.save(Joke, joke);
}
