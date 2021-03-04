import {
    BaseEntity,
    Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique
} from "typeorm";
import { QUIZ_QUESTION_ANSWER } from "../config/tables";
import QuizQuestion from "./quiz-question.model";

@Entity(QUIZ_QUESTION_ANSWER)
export default class QuizQuestionAnswer extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id?: number;

  @Column({ length: 50 })
  public text: string;

  @Column({ default: false })
  public correct: boolean;

  @OneToMany((type) => QuizQuestion, (q) => q.answers)
  public question: QuizQuestion;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;
}
