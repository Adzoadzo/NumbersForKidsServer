import express from "express";
import { Request, Response } from "express";
import UserService from "../services/user.service";
import { logInUser, tokenValidation } from "../helpers/auth.helpers";
import QuizService from "../services/quiz.service";
import QuizResultService from "../services/quiz-result.service";

const router = express.Router();

/** Get my quiz resultsc
 *
 */
router.get("/quiz-results", async (req: Request, res: Response) => {
  try {
    const result = await QuizResultService.findOneBy(res.locals.user.email, "email");
    return res.status(200).json(result);
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error: "An error occurred" });
  }
});

/**
 *
 */
router.get("/profile", async (req: Request, res: Response) => {
  let result;
  try {
    console.log(res.locals.user.email);
    result = await UserService.findOneBy({email: res.locals.user.email});
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
  res.status(200).json(result);
});

/** FInish quiz
 *
 */
router.post("/complete-quiz", async (req: Request, res: Response) => {
  try {
    const result = await QuizService.complete(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({ error: "An error occurred" });
  }
});

export default router;
