import bcrypt from "bcrypt";
import { error } from "util";
import { getConnection } from "typeorm";
import QuizResult from "../models/quiz-result.model";

export default class QuizResultService {
  /**
   * Get list of quiz result items
   * @returns {Promise<QuizResult[]>}
   */
  public static async find(): Promise<QuizResult[]> {
    return await QuizResult.find();
  }

  /**
   * Get single Quiz
   * @returns {Promise<QuizResult>}
   */
  public static async findOneBy(param: any, type: string): Promise<QuizResult> {
    return await QuizResult.findOne({ [type]: param });
  }

  //   /**
  //    * Create Quiz
  //    * @returns {Promise<Quiz>}
  //    */
  //   public static async create(data: any): Promise<any> {
  //     try {
  //       return await Quiz.save(data);
  //     } catch (e) {
  //       console.error(e);
  //       throw e;
  //     }
}
