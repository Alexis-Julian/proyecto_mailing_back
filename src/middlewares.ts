import * as core from "express-serve-static-core";
import express from "express";
import session from "express-session";
import sessionConfig from "./sessionConfig";

export default (app: core.Express) => {
	app.use(session(sessionConfig));
	app.use(express.json());
};
