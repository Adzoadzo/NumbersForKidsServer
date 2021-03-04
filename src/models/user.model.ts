import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { USER } from "../config/tables";
import Role from "./role.model";
import QuizResult from "./quiz-result.model";

@Entity(USER)
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column({ length: 25 })
  public firstName?: string;

  @Column({ length: 50 })
  public lastName?: string;

  @Column()
  public password: string;

  @ManyToOne((type) => Role, (role) => role.users, { eager: true })
  public role?: Role;

  @Column({ nullable: false, default: 2 })
  public roleId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;

  @OneToMany((type) => QuizResult, (qr) => qr.user)
  public quizResults?: QuizResult[];
}
