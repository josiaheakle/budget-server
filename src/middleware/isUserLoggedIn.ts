import * as Express from "express";

import { User } from "../models/m.User";
import { JWT } from "../modules/JWT";

import { ServerResponse } from "../types/ServerResponse";

/**
 * Checks if user is logged in when making request.
 *
 * ---
 * Parses the "Authorization" header, returning user data or an invalid response.
 */
const isUserLoggedIn = async (req: Express.Request, res: Express.Response, next: () => void) => {
	const header = req.header("Authorization");
	const splitHeader = header?.split(" ");
	if (!splitHeader) {
		// If no Authorization header
		const response: ServerResponse = {
			isValid: false,
			message: "Missing Authorization header.",
		};
		res.send(response);
	} else {
		if (splitHeader[0] !== "Bearer") {
			// If missing 'Bearer'
			const response: ServerResponse = {
				isValid: false,
				message: "Json Web Token invalid (missing Bearer).",
			};
			res.send(response);
		} else {
			// Valid token
			const token = splitHeader[1];
			const userId = await JWT.decodeJWT(token);
			if (userId === undefined) {
				// If userId does not exist
				const response: ServerResponse = {
					isValid: false,
					message: "Unable to authorize with credentials provided.",
				};
				res.send(response);
			} else {
				// If token is valid and userId exists
				const user = await User.findOne({
					where: {
						id: userId,
					},
				});
				if (!user) {
					// Unable to find user
					const response: ServerResponse = {
						isValid: false,
						message: "Unable to find user.",
					};
					res.send(response);
				} else {
					// Able to find user
					res.locals.user = user;
					next();
				}
			}
		}
	}
};

export { isUserLoggedIn };
