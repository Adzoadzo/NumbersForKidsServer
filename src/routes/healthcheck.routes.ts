import express, { Request, Response } from "express";

// healthcheck.routes.js: return a 2xx response when your server is healthy, else send a 5xx response
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

// export router with all routes included
export default router;
