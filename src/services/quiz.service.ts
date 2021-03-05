import bcrypt from "bcrypt";
import { error } from "util";
import { getConnection } from "typeorm";
import Quiz from "../models/quiz.model";

export default class QuizService {
  /**
   * Get list of quiz items
   * @returns {Promise<Quiz[]>}
   */
  public static async find(): Promise<Quiz[]> {
    return await Quiz.createQueryBuilder()
      .leftJoinAndSelect("Quiz.questions", "questions")
      .leftJoinAndSelect("questions.answers", "answers")
      .getMany();
  }

  /**
   * Get list of Quiz
   * @returns {Promise<Quiz[]>}
   */
  public static async getQuizItems(): Promise<Quiz[]> {
    return await Quiz.find({ select: ["name", "id"] });
  }

  /**
   * Get single Quiz
   * @returns {Promise<Quiz[]>}
   */
  public static async findOneBy(filter: any): Promise<Quiz> {
    return await Quiz.findOne({
      ...filter,
      relations: ["questions", "questions.answers"],
    });
  }

  /**
   * Create Quiz
   * @returns {Promise<Quiz>}
   */
  public static async create(data: any): Promise<any> {
    try {
      return await Quiz.save(data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Update Quiz
   * @returns {Promise<Quiz>}
   */
  public static async update(id: number, data: any): Promise<any> {
    try {
      let q: Quiz = await Quiz.findOne({ id });
      if (!q) {
        return { error: 400, send: `quiz with id ${id} does not exist` };
      }

      q = { ...q, ...data };
      return await Quiz.save(q);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Remove Quiz
   * @returns {Promise<Quiz>}
   */
  public static async remove(id: number): Promise<any> {
    try {
      const q = await Quiz.findOne({ id });
      return await Quiz.remove(q);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Complete a quiz by creating a quiz result item
   * @returns {Promise<QuizResult>}
   */
  public static async complete(data: any): Promise<any> {
    // try {
    //   const q = await Quiz.findOne({ id });
    //   return await Quiz.remove(q);
    // } catch (e) {
    //   throw e;
    // }
  }
}
