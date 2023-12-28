import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { AppDataSource } from "@/models/data-source";
import { User } from "./User";

export interface JokeDto {
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
