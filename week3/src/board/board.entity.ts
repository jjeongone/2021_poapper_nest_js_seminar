import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany, JoinTable
} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column()
    views: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.boards)
    user: User;

    @ManyToMany(() => User, user => user.boards)
    @JoinTable()
    users: User[];
}