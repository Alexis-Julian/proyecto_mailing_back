import session = require("express-session");

declare module "express-session" {
	interface Session {
		user?: {
			token: string;
		};
	}
}

const sessionConfig: session.SessionOptions = {
	secret: "probando",
	resave: true,
	saveUninitialized: true,
};

export default sessionConfig;
