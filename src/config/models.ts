import User from "../models/user.model";
import Role from "../models/role.model";
import Quiz from "../models/quiz.model";
import QuizQuestion from "../models/quiz-question.model";
import QuizQuestionsAnswer from "../models/quiz-question-answer.model";
import QuizResult from "../models/quiz-result.model";

export const dbModels = [
  User,
  Role,
  Quiz,
  QuizQuestion,
  QuizQuestionsAnswer,
  QuizResult
];
