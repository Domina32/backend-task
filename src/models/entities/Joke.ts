import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AppDataSource } from "@/models/data-source";

export interface JokeType {
    value: string;
}

@Entity()
export class Joke {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;
}

export async function insert(value: string) {
    console.log("insert:", value);
    const joke = new Joke();
    joke.value = value;

    await AppDataSource.manager.save(joke);

    await AppDataSource.createQueryBuilder()
        .insert()
        .into(Joke)
        .values([{ value: value }])
        .execute();
}
