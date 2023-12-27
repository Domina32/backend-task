import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany,
} from "typeorm";
import { Joke } from "./Joke";
// import { Joke } from "./Joke";
export interface UserDto {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(() => Joke, (joke) => joke.users, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinTable()
    jokes?: Joke[];
}
