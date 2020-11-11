import {
  BaseEntity,
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Note from "./Note";
import Announcement from "./Announcement";

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullName: String;

  @Column({ nullable: false })
  schoolName: string;

  @Column({ unique: true })
  omang: string;

  @Column({ nullable: false })
  location: string;

  @Column({ default: 'student' })
  role: string;

  @Column('text')
  password: string;

  @OneToMany(type => Note, notes => notes.user,
      { onDelete: 'CASCADE', eager:true })
  notes: Note[];

  @OneToMany(type => Announcement, notes => notes.user,
      { onDelete: 'CASCADE', eager:true })
  announcements: Announcement[];
}
