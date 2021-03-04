import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { decode, sign, verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import UserService from "../services/user.service";

/**
 *
 */
export const logInUser = async (user: User) => {
  if (!user.email || !user.password) {
    return { status: 400, send: { error: "email/password not provided" } };
  }

  const foundUser = await User.findOne({ email: user.email });
  if (!foundUser) {
    return {
      status: 400,
      send: "There is no user with this email",
    };
  } else {
    const valid: any = await bcrypt.compare(user.password, foundUser.password);
    if (!valid) {
      return {
        status: 400,
        send: "Invalid password",
      };
    } else {
      delete foundUser.password;
      return {
        status: 200,
        send: {
          user: foundUser,
          token: jwt.sign(
            {
              email: foundUser.email,
              id: foundUser.id,
              roleId: foundUser.roleId,
            },
            process.env.SECRET_KEY,
            { algorithm: "HS256" }
          ),
        },
      };
    }
  }
};

/**
 *
 */
export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  if ((req.headers.authorization as string).split(" ")[0] === "Bearer") {
    console.log(
      (req.headers.authorization as string).split(" ")[1].trim(),
      process.env.SECRET_KEY
    );
    verify(
      (req.headers.authorization as string).split(" ")[1],
      process.env.SECRET_KEY,
      { algorithms: ["HS256"] },
      async (err: Error, decoded: any) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ error: "Invalid credentials" });
        }
        if (await validateAccess(req.originalUrl, decoded.id)) {
          res.locals.user = decoded;
          next();
        } else {
          return res.json({ message: "access forbidden" });
        }
      }
    );
  }
};

/**
 * Validates if user has access to admin endpoints
 */
export const teacherAccessValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user.roleId !== 1) {
    return res.json({ message: "access forbidden" });
  } else {
    next();
  }
};

/**
 *
 */
async function validateAccess(route: string, userID: number): Promise<boolean> {
  return await UserService.findOneBy({ id: userID }).then(
    async (response: User) => {
      if (!response) {
        return false;
      }
      return true;
    }
  );
}
