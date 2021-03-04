import express, { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { logInUser } from "../helpers/auth.helpers";

const router = express.Router();

/**
 *
 */
router.post("/login", async (req: Request, res: Response) => {
  let result;
  try {
    result = await logInUser(req.body);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }

  res.status(result.status).json({ message: result.send });
});

/**
 *
 */
router.post("/register", async (req: Request, res: Response) => {
  let result;

  // registered user if by default a user
  delete req.body.role;
  delete req.body.roleId;
  try {
    result = await UserService.create(req.body);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error: "An error occurred" });
  }
  res.status(200).json(result);
});

/**
 *
 */
router.get(
  "/auth/refresh",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ token: "token" });
  }
);

export default router;
