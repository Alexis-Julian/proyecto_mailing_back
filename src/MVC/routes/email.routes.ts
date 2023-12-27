import express from "express";
import {
	modifyEmail,
	getEmail,
	saveEmail,
	deleteEmail,
} from "../controller/emai.controller";

export const app = express.Router();

app.put("/modify/:email", modifyEmail);

app.get("/", getEmail);

app.post("/save/:email", saveEmail);

app.delete("/remove", deleteEmail);
