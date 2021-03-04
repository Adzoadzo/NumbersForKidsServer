import express from "express";
import { Request, Response } from "express";
import QuizService from "../services/quiz.service";
import { logInUser } from "../helpers/auth.helpers";

// services
import UserService from "../services/user.service";
import QuizQuestion from "src/models/quiz-question.model";

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

/** Create quiz item
 * Returns quiz item
 */
const quizPostAction = async (req: Request, res: Response) => {
  let result;
  try {
    result = await QuizService.create(req.body);
    // req.body.questions.map(q => QuizQuestio.)
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: e });
  }

  res.status(200).json(result);
};

/** Update existing quis item
 * Returns quiz item
 */
const quizPutAction = async (req: Request, res: Response) => {
  let result;
  try {
    result = await QuizService.update(parseInt(req.params.id, 10), req.body);
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: e });
  }

  res.status(200).json(result);
};

/** Delete quiz item
 *
 */
const quizDelAction = async (req: Request, res: Response) => {
  try {
    const result = await QuizService.remove(parseInt(req.params.id, 10));
    res.status(200).json(result);
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: e });
  }
};

// Users routes
/** List multiple users
 *
 */
const userGetAction = async (req: Request, res: Response) => {
  let result;
  try {
    result = await UserService.find();
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }
  res.status(200).json(result);
};

/** Get single user
 *
 */
const userGetSingleAction = async (req: Request, res: Response) => {
  try {
    const result = await UserService.findOneBy({
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

// Users routes
/** List multiple users
 *
 */
const userPutAction = async (req: Request, res: Response) => {
  try {
    const result = await UserService.update(
      parseInt(req.params.id, 10),
      req.body
    );
    return res.status(200).json(result);
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }
};

/** Delete user action
 *
 */
const userDelAction = async (req: Request, res: Response) => {
  try {
    const result = await UserService.remove(parseInt(req.params.id, 10));
    return res.status(200).json(result);
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }
};

/** Create user
 * Returns user
 */
const userPostAction = async (req: Request, res: Response) => {
  let result;

  if (req.body.role) {
    req.body.roleId = req.body.role?.id;
    delete req.body.role;
  }

  try {
    result = await UserService.create(req.body);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }

  res.status(200).json(result);
};

// Quiz routes
router.get("/quizzes", quizGetAction);
router.get("/quizzes/:id", quizGetSingleAction);
router.post("/quizzes", quizPostAction);
router.put("/quizzes/:id", quizPutAction);
router.delete("/quizzes/:id", quizDelAction);

// User routes
router.get("/users", userGetAction);
router.get("/users/:id", userGetSingleAction);
router.post("/users", userPostAction);
router.put("/users/:id", userPutAction);
router.delete("/users/:id", userDelAction);

export default router;
