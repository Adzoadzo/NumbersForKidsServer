require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { connection } from "./config/database";
import {
  teacherAccessValidation,
  tokenValidation,
} from "./helpers/auth.helpers";
import morgan from "morgan";

// routers
import healthRouter from "./routes/healthcheck.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import teacherRouter from "./routes/teacher.routes";
import meRouter from "./routes/me.routes";

const app = express();

// connect to db
connection
  .then((conn: any) => {
    console.log(`connected: ${conn.isConnected}`);
  })
  .catch((error: any) => console.log(error));

// CORS configuration
app.use((req: Request, res: Response, next: NextFunction) => {
  // FIX ME - shouldn't be any
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// use routers
app.use("/v1/auth", authRouter);
app.use("/v1/users", tokenValidation, userRouter);
app.use("/v1/teacher", tokenValidation, teacherAccessValidation, teacherRouter);
app.use("/v1/me", tokenValidation, meRouter);
app.use("/", healthRouter);

// handles 404 requests
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.send({ error: "Not found, this route does not match any endpoint!" });
  return;
});

// start the Express server
app.listen({
  port: process.env.PORT || 3333,
  hostname: process.env.YOUR_HOST || "0.0.0.0",
  callback: () => console.log("W-API listening on port 3333!"),
});
