// import { DocumentReference } from "firebase/firestore";
import { AuthLogin } from "../../DTO/auth-login.dto";
import { AuthRegister } from "../../DTO/auth-register.dto";

// import { ComparePassword } from "../../libs/bcrypt";
import * as createError from "http-errors";
// import { createToken } from "../../libs/jwt";
import { db, firebase } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { auth } from "../../firebase-config";

import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";

export class UserService {
	async AuthLogin({ email, password }: AuthLogin): Promise<any> {
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(response);
	}

	async AuthRegister(RegisterObject: AuthRegister): Promise<any> {
		const { email, name, lastname, password } = RegisterObject;

		const createOtherFields = async (id: string) => {
			const result = await setDoc(doc(db, "users", id), {
				name,
				lastname,
			});

			return result;
		};

		const response: UserCredential | any = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = createOtherFields(response.user.uid);

		const token = response.user.stsTokenManager.accessToken;

		return token;
	}

	async AuthToken(token: string | undefined) {
		if (!token) throw new createError.Unauthorized("Token not valid");

		return firebase
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
