import * as jwt from "jsonwebtoken"

import { User } from "../models/m.User"

abstract class JWT {
	static async decodeJWT(token: string): Promise<string | jwt.JwtPayload | undefined> {
		return new Promise((res, rej) => {
			jwt.verify(token, process.env.JWT_KEY as string, (err, decoded) => {
				if (err) rej(err)
				else res(decoded)
			})
		})
	}

	static generateJWT(user: User) {
		return jwt.sign(user.uuid, process.env.JWT_KEY as string)
	}
}

export { JWT }
