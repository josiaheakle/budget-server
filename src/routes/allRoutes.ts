import Express from "express";

import { router as budgetRouter } from "./budget";
// import {router as expenseRouter} from './expense'

const router = Express.Router();

router.use("/budget", budgetRouter);

export { router };
