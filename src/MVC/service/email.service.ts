import { setDoc, getDoc, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { adminApp, db } from "../../firebase-config";

export default class emailService {
	async modifyEmail(_email: string) {}

	getEmail(email: string) {
		return email;
	}
	async saveEmail(uid: any, email: any) {
		const docRef = doc(db, "users", uid);

		const response = await updateDoc(docRef, { emails: arrayUnion(email) });
		console.log(response);
		return response;
	}
	deleteEmail(email: string) {
		return email;
	}
}
