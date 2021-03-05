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
import { QUIZ_QUESTION } from "../config/tables";
import QuizQuestionAnswer from "./quiz-question-answer.model";
import Quiz from "./quiz.model";

@Entity(QUIZ_QUESTION)
export default class QuizQuestion extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id?: number;

  @Column({ length: 200 })
  public text: string;

  @ManyToOne((type) => Quiz, (q) => q.questions)
  public quiz?: Quiz;

  @OneToMany((type) => QuizQuestionAnswer, (qa) => qa.question, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  public answers?: QuizQuestionAnswer[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;
}
