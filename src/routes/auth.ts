import Express from "express";

import { User as ModelUser } from "../models/m.User";
import { JWT } from "../modules/JWT";

import { Op } from "sequelize";

const router = Express.Router();

router.post("/login", (req: Express.Request, res: Express.Response, next: Function) => {
	const { email, password } = req.body;
	const user = ModelUser.findOne({
		where: {
			email: {
				[Op.eq]: email,
			},
		},
	});
	console.log({ email, password, user });
	res.send("Hello there");
});

router.post("/register", (req: Express.Request, res: Express.Response, next: Function) => {});

export { router as authRouter };
