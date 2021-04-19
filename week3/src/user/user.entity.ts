import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Board} from "../board/board.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Board, board => board.user)
    boards: Board[];
}