import {
    BaseEntity,
    Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique
} from "typeorm";
import { QUIZ_RESULT } from "../config/tables";
import QuizQuestion from "./quiz-question.model";
import Quiz from "./quiz.model";
import User from "./user.model";

@Entity(QUIZ_RESULT)
export default class QuizResult extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id?: number;

  @Column({ nullable: true, default: false })
  public passed: boolean;

  @ManyToOne((type) => User, (u) => u.quizResults)
  public user: User;

  @ManyToOne((type) => Quiz, (q) => q.results)
  public quiz: Quiz;

  // @OneToMany((type) => QuizQuestionAnswer, (q) => q.)
  public correctAnswers?: QuizQuestion[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;
}
