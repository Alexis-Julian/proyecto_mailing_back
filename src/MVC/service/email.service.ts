import { setDoc, getDoc, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { adminApp, db } from "../../firebase-config";
import createHttpError from "http-errors";

export default class emailService {
	async modifyEmail(_email: string) {}

	async getEmail(uid: any): Promise<string[] | undefined> {
		const docRef = doc(db, "users", uid);

		const response = await getDoc(docRef);

		if (response.exists()) {
			return response.data().emails;
		} else {
			return undefined;
		}
	}

	async saveEmail(uid: any, email: string) {
		const emailIsRepeated = async (email: string): Promise<boolean> => {
			const response = await this.getEmail(uid);

			if (response) return response.some((e) => e === email);

			return false;
		};

		if (await emailIsRepeated(email))
			throw createHttpError(409, "Email already exists");

		const docRef = doc(db, "users", uid);

		await updateDoc(docRef, { emails: arrayUnion(email) });

		return createHttpError(200, "success");
	}

	deleteEmail(email: string) {
		return email;
	}
}
