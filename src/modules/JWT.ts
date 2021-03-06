import * as jwt from "jsonwebtoken";

import { User } from "../models/m.User";

abstract class JWT {
  static async decodeJWT(token: string): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((res, rej) => {
      jwt.verify(token, process.env.JWT_TOKEN as string, (err, decoded) => {
        if (err) rej(err);
        else res(decoded);
      });
    });
  }

  static generateJWT(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_TOKEN as string);
  }
}

export { JWT };
