// import { DocumentReference } from "firebase/firestore";
import { AuthLogin } from "../../DTO/auth-login.dto";
import { AuthRegister } from "../../DTO/auth-register.dto";

// import { ComparePassword } from "../../libs/bcrypt";
import createHttpError, * as createError from "http-errors";
// import { createToken } from "../../libs/jwt";
import { db, adminApp } from "../../firebase-config";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth } from "../../firebase-config";

import {
	UserCredential,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { createToken } from "../../libs/jwt";

export class UserService {
	async AuthLogin({ email, password }: AuthLogin): Promise<any> {
		const getOtherFields = async (id: string) => {
			const docSnap = await getDoc(doc(db, "users", id));

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				throw createHttpError(404, "User not found");
			}
		};

		const response = await signInWithEmailAndPassword(auth, email, password);

		const userOtherFields = await getOtherFields(response.user.uid);

		const user = {
			uid: response.user.uid,
			email: response.user.email,
			...userOtherFields,
		};

		return await createToken(user, "1d");
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

	async AuthToken(token: string | undefined) {
		if (!token) throw new createError.Unauthorized("Token not valid");

		return adminApp
			.auth()
			.verifyIdToken(token)
			.then((response) => {
				return response;
			})
			.catch(() => {
				throw new createError.Unauthorized("Token not valid");
			});
	}
}
