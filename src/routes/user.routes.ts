import express from "express";
import { Request, Response } from "express";
import { tokenValidation } from "../helpers/auth.helpers";
import UserService from "../services/user.service";

const router = express.Router();

/** List multiple users
 *
 */
router.get("/", async (req: Request, res: Response) => {
  let result;
  try {
    result = await UserService
      .find
      // req.query.offset,
      // req.query.take,
      // req.query.criteria
      ();
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }

  res.status(200).json(result);
});

/** Get single user
 *
 */
router.get("/:id", tokenValidation, async (req: Request, res: Response) => {
  let result;
  try {
    result = await UserService.findOneBy({ id: req.params.id });
  } catch (e) {
    console.log("error: ", e);
    res.status(400).json({ error: "An error occurred" });
  }

  res.status(200).json(result);
});

/** Update user
 *
 */
router.put("/:id", tokenValidation, async (req: Request, res: Response) => {
  let result;
  console.log(req.body, "body");
  try {
    result = await UserService.update(parseInt(req.params.id, 10), req.body);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error: "An error occurred" });
  }

  res.status(200).json(result);
});

export default router;
