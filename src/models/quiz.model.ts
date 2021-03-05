import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { QUIZ } from "../config/tables";
import QuizQuestion from "./quiz-question.model";
import QuizResult from "./quiz-result.model";

@Entity(QUIZ)
export default class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id?: number;

  @Column({ length: 50, unique: true })
  public name: string;

  @Column({ length: 50 })
  public subject: string;

  @Column({ nullable: true })
  public description: string;

  @OneToMany((type) => QuizQuestion, (q) => q.quiz, { cascade: true })
  @JoinColumn()
  public questions?: QuizQuestion[];

  @OneToMany((type) => QuizResult, (qr) => qr.quiz)
  public results?: QuizResult[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;
}
