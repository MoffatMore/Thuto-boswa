import {
    BaseEntity,
    Column,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from "./User";

@Entity('notes')
export default class Note extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: String;

    @Column('text')
    description: string;

    @ManyToOne(type => User, user => user.notes, {
        onDelete: 'CASCADE'
    })
    user: User;
}
