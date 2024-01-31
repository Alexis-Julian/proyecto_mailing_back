// import { DocumentReference } from "firebase/firestore";
import { AuthLogin } from "../../DTO/auth-login.dto";
import { AuthRegister } from "../../DTO/auth-register.dto";
import { ResponseHTTP } from "../../shares/types";

// import { ComparePassword } from "../../libs/bcrypt";
import createHttpError, * as createError from "http-errors";
import { HttpError } from "http-errors";
// import { createToken } from "../../libs/jwt";

import { pool } from "../../libs/mysql";

import { auth } from "../../firebase-config";
import { ComparePassword, HashPassword } from "../../libs/bcrypt";
import {
	UserCredential,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { createToken, validateToken } from "../../libs/jwt";
import { JwtPayload } from "jsonwebtoken";

/* ResponseHTTP<string> | HttpError */
export class UserService {
	async AuthLogin({ email, password }: AuthLogin): Promise<any> {
		console.log(email, password);
		const response: Array<any> = await pool.query(
			"SELECT email, password_account,first_name,last_name FROM users WHERE email = ?",
			[email]
		);

		if (response.length == 0)
			return {
				statuscODE: 401,
				message: "Unauthorized",
				data: "Email not found",
			};

		const [{ password_account, first_name, last_name }] = response;

		const Authorized = await ComparePassword(password, password_account);

		if (!Authorized)
			return {
				statuscODE: 401,
				message: "Unauthorized",
				data: "password is incorrect",
			};

		const payload = { email, first_name, last_name };

		const token = await createToken(payload, "1d");

		return {
			statusCode: 200,
			message: "Successfully",
			data: token,
		};
	}

	async AuthRegister(RegisterObject: AuthRegister): Promise<any> {
		const { first_name, last_name, email, password_account } = RegisterObject;

		const passwordHash = await HashPassword(password_account);

		await pool.query(
			`INSERT INTO users(first_name,last_name,email,password_account) VALUES(?,?,?,?)`,
			[first_name, last_name, email, passwordHash]
		);

		const payload = { first_name, last_name, email };

		const token = await createToken(payload, "1d");

		return {
			statusCode: 201,
			message: "Successfully",
			data: token,
		};
	}

	async AuthToken(
		token: string | undefined
	): Promise<ResponseHTTP<JwtPayload | string> | HttpError> {
		if (!token) throw new createError.Unauthorized("Token not valid");

		const responseToken = await validateToken(token);
		if (responseToken) {
			return {
				statusCode: 202,
				message: "Token valid",
				data: responseToken,
			};
		}

		return createHttpError(404, "Syntax error");
	}
}
