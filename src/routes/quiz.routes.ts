import express from "express";
import { Request, Response } from "express";
import QuizService from "../services/quiz.service";
import { tokenValidation } from "../helpers/auth.helpers";
import UserService from "../services/user.service";

const router = express.Router();

/** List multiple quiz items
 * Returns quiz items
 */
const quizGetAction = async (req: Request, res: Response) => {
  let result;
  try {
    result = await QuizService.find();
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }

  res.status(200).json(result);
};

/** Get single quiz
 *
 */
const quizGetSingleAction = async (req: Request, res: Response) => {
  try {
    const result = await QuizService.findOneBy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    console.log("result", result);
    return res.status(200).json(result);
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }
};

/** Submit single quiz
 *
 */
const submitQuiz = async (req: Request, res: Response) => {
  try {
    const result = await QuizService.findOneBy({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });

    if (!result) {
      return res.status(400).json({ error: "An error occurred" });
    }

    let count = 0;
    const answers = result.questions?.map((q) => {
      const an = q.answers?.find((a) => a.correct);
      return q.answers.indexOf(an);
    });
    req.body.forEach((v: any, i: number) => {
      if (Number(answers[i]) === Number(v)) {
        count++;
      }
    });

    console.log(answers, req.body);

    return res.status(200).json({ correctAnswers: count });
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }
};

// Quiz routes
router.get("/", quizGetAction);
router.get("/:id", quizGetSingleAction);
router.post("/:id/submit", submitQuiz);

export default router;
