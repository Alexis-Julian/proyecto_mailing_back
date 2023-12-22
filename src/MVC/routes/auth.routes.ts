import express from "express";
import { Login, Register, validateToken } from "../controller/auth.controller";

export const app = express.Router();

app.post("/login", Login);

app.post("/register", Register);

app.get("/token", validateToken);
