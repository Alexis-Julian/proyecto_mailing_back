import express from "express";
import { Login } from "../controller/auth.controller";
import UserDao from "../../DTO/auth-login.dto";

export const app = express.Router();

app.post("/login", UserDao(["email", "password"]), Login);

app.post("/register", (_, res) => {
	console.log(res.send("1"));
});
