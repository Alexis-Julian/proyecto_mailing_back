import { pool } from "../../libs/mysql";

export default class emailService {
	async modifyEmail(_email: string) {}

	async getEmail(uid: any): Promise<any> {
		const response: Array<any> = await pool.query(
			"SELECT email_friend,business,created_at FROM mailing_db.friends WHERE id_user = ?",
			[uid]
		);

		if (response.length == 0)
			return {
				statusCode: 200,
				message: "OK",
				data: "you not have email associated",
			};

		return {
			statusCode: 200,
			message: "OK",
			data: response.map((data) => {
				return {
					email: data.email_friend,
					business: data.business,
					created_at: data.created_at,
				};
			}),
		};
	}

	async saveEmail(uid: any, email: string) {
		const response: any = await pool.query(
			"INSERT INTO friends(id_user,email_friend) VALUES (?, ?)",
			[uid, email]
		);

		if (response.length == 0)
			return {
				statusCode: 404,
				message: "Error",
				data: "Error",
			};

		return {
			statusCode: 200,
			message: "OK",
			data: "Email successfully added",
		};
	}

	deleteEmail(email: string) {
		return email;
	}
}
