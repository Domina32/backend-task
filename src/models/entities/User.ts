import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export interface UserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    signedUp: boolean;
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

    @Column()
    signedUp: boolean;
}
