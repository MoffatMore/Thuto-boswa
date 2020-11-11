import {
    BaseEntity,
    Column,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from "./User";

@Entity('announcements')
export default class Announcement extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: String;

    @Column('text')
    description: string;

    @ManyToOne(type => User, user => user.announcements, {
        onDelete: 'CASCADE'
    })
    user: User;
}
