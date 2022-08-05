/**
 * Centralized place for all routers to be pulled into app
 */

import Express from "express";

import { budgetRouter } from "./budget";
import { authRouter } from "./auth";

const router = Express.Router();

router.use("/budget", budgetRouter);
router.use("/auth", authRouter);

export { router };
