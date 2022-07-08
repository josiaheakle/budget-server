import Express from "express";
import { isUserLoggedIn } from "../middleware/isUserLoggedIn";

const router = Express.Router();

router.use(isUserLoggedIn);
router.get("/:budgetId", (req, res, next) => {});

export { router };
