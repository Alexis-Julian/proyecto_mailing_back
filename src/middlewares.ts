import * as core from "express-serve-static-core";
import express from "express";
import session from "express-session";

export default (app: core.Express) => {
	app.use(
		session({
			secret: "probando",
			resave: true,
			saveUninitialized: true,
		})
	);
	app.use(express.json());
};
