import mysql from "serverless-mysql";

export const pool = mysql({
	config: {
		host: "localhost",
		user: "root",
		password: "password",
		port: 3306,
		database: "mailing_db",
	},
});
