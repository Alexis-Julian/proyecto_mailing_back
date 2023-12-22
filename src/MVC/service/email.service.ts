import { firebase } from "../../firebase-config";

export default class emailService {
	async modifyEmail(email: string) {
		/* 	const response = (await firebase.auth().getUserByEmail(email))
			.providerData[0];
 */
		/* return response; */
	}
	getEmail(email: string) {
		return email;
	}
	saveEmail(email: string) {
		return email;
	}
	deleteEmail(email: string) {
		return email;
	}
}
