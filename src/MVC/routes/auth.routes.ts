import express from "express";
import { Login } from "../controller/auth.controller";
import { UserDao } from "../../DAO/firebase/user.dao";
export const app = express.Router();

const asd = new UserDao();
app.post("/login", Login);

app.post("/register", (_, res) => {
	asd.getCollection();
	res.send("1");
});
