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
	async AuthLogin({ email, password }: any): Promise<any> {
		const response: Array<any> = await pool.query(
			"SELECT email, password_account,first_name,last_name,id_user FROM users WHERE email = ?",
			[email]
		);
		console.log(response);

		if (response.length == 0)
			return {
				statusCode: 401,
				message: "Unauthorized",
				data: "Email not found",
			};

		const [{ password_account, first_name, last_name, id_user }] = response;

		const Authorized = await ComparePassword(password, password_account);

		if (!Authorized)
			return {
				statusCode: 401,
				message: "Unauthorized",
				data: "password is incorrect",
			};

		const payload = { uid: id_user, email, first_name, last_name };

		const token = await createToken(payload, "1d");

		return {
			statusCode: 200,
			message: "Successfully",
			data: token,
		};
	}

	async AuthRegister(RegisterObject: any): Promise<any> {
		console.log(RegisterObject);
		const { name, lastname, email, password } = RegisterObject;

		const passwordHash = await HashPassword(password);

		await pool.query(
			`INSERT INTO users(first_name,last_name,email,password_account) VALUES(?,?,?,?)`,
			[name, lastname, email, passwordHash]
		);

		const response: Array<any> = await pool.query(
			`SELECT id_user FROM mailing_db.users WHERE email = ? `,
			[email]
		);

		if (response.length == 0)
			return { statusCode: 404, message: "User not found" };

		const payload = { uid: response[0].id_user, name, lastname, email };

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
