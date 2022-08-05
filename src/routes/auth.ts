/**
 * All user authorization routes (login, register)
 */

import Express from "express";
import { body, validationResult } from "express-validator";
import { Op } from "sequelize";
import * as bcrypt from "bcrypt";

import { User as ModelUser, User } from "../models/m.User";
import { formatServerResponse, formatValidationErrors } from "../modules/util/ObjectFormatter";
import { JWT } from "../modules/JWT";

const router = Express.Router();

/**
 * Log user in.
 * ---
 * 1. Get user by email.
 * 2. Verify with hashed password.
 * 3. Create and return new JWT.
 */
router.post("/login", async (req: Express.Request, res: Express.Response, next: Function) => {
	// Request data
	const { email, password } = req.body;
	const loginErrorMsg = "Email and password combination not associated with an account.";

	// Existing user
	const user = await ModelUser.findOne({
		where: {
			email: {
				[Op.eq]: email,
			},
		},
	});

	// Handle no user associated with email
	if (!user) {
		return res.json(
			formatServerResponse(false, loginErrorMsg, undefined, {
				email: [loginErrorMsg],
				password: [loginErrorMsg],
			})
		);
	}

	// Handle incorrect password
	if (!(await bcrypt.compare(password, user.password))) {
		return res.json(
			formatServerResponse(false, loginErrorMsg, undefined, {
				email: [loginErrorMsg],
				password: [loginErrorMsg],
			})
		);
	}

	// On login
	return res.json(
		formatServerResponse(true, "Successfully logged in!", {
			jwt: JWT.generateJWT(user),
		})
	);
});

/**
 * Account registration route.
 * ---
 * 1. Validate input
 * 	name exists and is string
 * 	email is an email
 * 	password has
 * 		8+char
 * 		1 cap
 * 		1 num
 * 		1 spec
 * 2. Create new account
 * 3. Return JWT && user data
 */
router.post(
	"/register",
	body("email").isEmail().withMessage("Must be a valid email."),
	body("firstName").notEmpty().withMessage("Required."),
	body("lastName").notEmpty().withMessage("Required."),
	body("password")
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
		.withMessage("Must contain 8+ characters, 1 capital letter, 1 number and 1 special character."),
	async (req: Express.Request, res: Express.Response, next: Function) => {
		// Check for validation errors

		console.log({ body: req.body });

		const registerErrorMsg = "Cannot create an account with this information, please try again.";
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.json(
				formatServerResponse(
					false,
					registerErrorMsg,
					undefined,
					formatValidationErrors(validationErrors["errors"])
				)
			);
		}

		const { email, firstName, lastName, password } = req.body;

		// Check email not already in use
		const existingUser = await ModelUser.findOne({
			where: {
				email: {
					[Op.eq]: email,
				},
			},
		});

		if (existingUser) {
			const errors = {
				email: ["Email already in use."],
			};
			return res.json(formatServerResponse(false, registerErrorMsg, undefined, errors));
		}

		// If hash fails, handle error
		try {
			var hashedPass = await bcrypt.hash(password, 10);
		} catch {
			return res.json(formatServerResponse(false, "Unknown error, please try again."));
		}

		// Create user
		const user = User.build({ email, firstName, lastName, password: hashedPass });
		await user.save();

		return res.json(
			formatServerResponse(true, "Successfully created account!", {
				jwt: JWT.generateJWT(user),
			})
		);
	}
);

export { router as authRouter };
