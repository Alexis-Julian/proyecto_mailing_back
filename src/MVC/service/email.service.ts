import { setDoc, getDoc } from "firebase/firestore";
import { adminApp } from "../../firebase-config";
export default class emailService {
	async modifyEmail(_email: string) {}

	getEmail(email: string) {
		return email;
	}
	async saveEmail(email: string) {
		/* adminApp.firestore(). */
		return email;
	}
	deleteEmail(email: string) {
		return email;
	}
}
