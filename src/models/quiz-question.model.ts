import {
  BaseEntity,
  Column,
  Entity,
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

  @OneToMany((type) => Quiz, (q) => q.questions)
  public quiz?: Quiz;

  @ManyToOne((type) => QuizQuestionAnswer, (qa) => qa.question, {
    eager: true,
  })
  public answers?: QuizQuestionAnswer[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;
}
