import * as core from "express-serve-static-core";
import express from "express";
import session from "express-session";
import sessionConfig from "./sessionConfig";
import Cors from "cors";
import morgan from "morgan";

export default (app: core.Express) => {
	app.use(Cors());
	app.use(morgan("dev"));
	app.use(session(sessionConfig));
	app.use(express.json());
};
