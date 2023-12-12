import jwt from "jsonwebtoken";
import "dotenv/config";

export function createToken(payload: any, expire: any) {
	/* Expire : 1hs : 1h , 1day: 1d */
	return new Promise((resolve, reject) => {
		jwt.sign(payload, "JSONWEBTOKEN", { expiresIn: expire }, (e, token) => {
			if (e) reject(e);
			resolve(token);
		});
	});
}
