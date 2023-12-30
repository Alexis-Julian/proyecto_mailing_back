// import { DocumentReference } from "firebase/firestore";
import { AuthLogin } from "../../DTO/auth-login.dto";
import { AuthRegister } from "../../DTO/auth-register.dto";
import { ResponseHTTP } from "../../shares/types";

// import { ComparePassword } from "../../libs/bcrypt";
import createHttpError, * as createError from "http-errors";
import { HttpError } from "http-errors";
// import { createToken } from "../../libs/jwt";
import { db, adminApp } from "../../firebase-config";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth } from "../../firebase-config";

import {
	UserCredential,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { createToken, validateToken } from "../../libs/jwt";
import { JwtPayload } from "jsonwebtoken";

export class UserService {
	async AuthLogin({
		email,
		password,
	}: AuthLogin): Promise<ResponseHTTP<string> | HttpError> {
		const getOtherFields = async (id: string) => {
			const docSnap = await getDoc(doc(db, "users", id));
			if (docSnap.exists()) return docSnap.data();
		};

		const response = await signInWithEmailAndPassword(auth, email, password);

		const userOtherFields = await getOtherFields(response.user.uid);

		const user = {
			uid: response.user.uid,
			email: response.user.email,
			...userOtherFields,
		};

		const token: string | undefined = await createToken(user, "1d");

		if (token)
			return {
				statusCode: 200,
				message: "Successfully",
				data: token,
			};

		return createHttpError(400, "Syntax error");
	}

	async AuthRegister(RegisterObject: AuthRegister): Promise<any> {
		const { email, name, lastname, password } = RegisterObject;

		const createOtherFields = async (id: string) => {
			await setDoc(doc(db, "users", id), { name, lastname, emails: [] });
		};

		const response: UserCredential | any = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		await createOtherFields(response.user.uid);

		const payload = { email, name, lastname, uid: response.user.uid };

		const token = createToken(payload, "1d");

		return token;
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
