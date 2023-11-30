import * as core from "express-serve-static-core";
import express from "express";
export default (app: core.Express) => {
	app.use(express.json());
};
